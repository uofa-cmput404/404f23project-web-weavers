from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from authors.serializers import AuthorSerializer
from post.serializers import PostSerializer
from likes.serializers import LikeSerializer
from rest_framework.response import Response
from rest_framework import status
from authors.models import Author
from inbox.models import Inbox
from followers.models import Follow
from post.models import Post
from likes.models import Like
from nodes.permissions import IsAuthorizedNode
from followers.serializers import FollowSerializer
from drf_spectacular.utils import extend_schema
import requests

# Create your views here.
@extend_schema(
    description="List all follows sent to the author's inbox.",
    responses={200: FollowSerializer(many=True)},
    tags=["inbox"]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAuthorizedNode])
def list_follows_from_inbox(request, author_id):
    inbox_owner = Author.objects.get(pk=author_id)
    if request.user != inbox_owner:
        return Response({"error": "You are not authorized to access this inbox"}, status = status.HTTP_403_FORBIDDEN)
    
    inbox = Inbox.objects.get(author=author_id)
    inbox_follows = inbox.follows.all()

    follow_serializer = FollowSerializer(inbox_follows, many=True)
    return Response({
        "type": "inbox",
        "author": inbox.author.url,
        "items": follow_serializer.data
    })

@extend_schema(
    description="List all likes sent to the author's inbox.",
    responses={200: LikeSerializer(many=True)},
    tags=["inbox"]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAuthorizedNode])
def list_likes_from_inbox(request, author_id):
    inbox_owner = Author.objects.get(pk=author_id)
    if request.user != inbox_owner:
        return Response({"error": "You are not authorized to access this inbox"}, status = status.HTTP_403_FORBIDDEN)
    
    inbox = Inbox.objects.get(author=author_id)
    inbox_likes = inbox.likes.all()

    like_serializer = LikeSerializer(inbox_likes, many=True)
    return Response({
        "type": "inbox",
        "author": inbox.author.url,
        "items": like_serializer.data
    })

# TODO: implement after Comments is done
# @extend_schema(
#     description="List all comments sent to the author's inbox.",
#     responses={200: CommentSerializer(many=True)}
# )
# @api_view(['GET'])
# def list_comments_from_inbox(self, request, author_id):
#     pass

@extend_schema(
    description="Delete a follow request from the author's inbox.",
    responses={200: {"message": "Follow request deleted"}}
)
@permission_classes([IsAuthenticated | IsAuthorizedNode])
@api_view(['DELETE'])
def delete_follow_request(request):
    follow_requester = Author.objects.get(id=request.data["actor"])
    author_to_follow = Author.objects.get(id=request.data["object"])
    if Follow.objects.filter(actor=follow_requester, object=author_to_follow).exists():
        Follow.objects.get(actor=follow_requester, object=author_to_follow).delete()

        return Response({"message": "Follow request deleted"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Follow request not found"}, status=status.HTTP_404_NOT_FOUND)
    
class InboxView(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated | IsAuthorizedNode]

    @extend_schema(
        description="List all posts sent to the author's inbox.",
        responses={200: PostSerializer(many=True)},
        tags=["inbox"]
    )
    def get(self, request, author_id):
        # if the author is not the owner of the inbox, they cannot access it
        inbox_owner = Author.objects.get(pk=author_id)
        if request.user != inbox_owner:
            return Response({"error": "You are not authorized to access this inbox"}, status = status.HTTP_403_FORBIDDEN)

        # Pagination settings
        self.page_size_query_param = 'size'
        self.page_size = 10 # default page size
        self.max_page_size = 100

        inbox = Inbox.objects.get(author=author_id)
        inbox_posts = inbox.posts.all().order_by('-published')
        
        # if a page query is provided, paginate the results
        if self.get_page_number(request, self):
            # results are paginated either by the default page size or the page size query parameter
            if self.get_page_size(request):
                inbox_posts = self.paginate_queryset(inbox_posts, request)

        post_serializer = PostSerializer(inbox_posts, many=True)
        return Response({
            "type": "inbox",
            "author": inbox.author.url,
            "items": post_serializer.data
        })
    
    @extend_schema(
        description="Send a post, follow request, like or comment to the author's inbox.",
        request=PostSerializer,
        responses={200: PostSerializer()},
        tags=["inbox"]
    )
    def post(self, request, author_id):
        """
        Send a post, follow request, like or comment to the author's inbox.
        """
        inbox = Inbox.objects.get(author=author_id)

        if request.data["type"] == "Follow":
            try:
                follow_requester = Author.objects.get(id=request.data["actor"])
            except Author.DoesNotExist:
                remote_author_url = request.data["actor"]
                # Most teams will require a trailing slash because of the Django backend
                if not remote_author_url.endswith("/"):
                    remote_author_url += "/"
                    
                remote_author = requests.get(remote_author_url).json()

                if not Author.objects.filter(displayName=remote_author["displayName"], host=remote_author["host"]).exists():
                    author_serializer = AuthorSerializer(data=remote_author)
                    if author_serializer.is_valid():
                        author_serializer.validated_data["id"] = remote_author_url     # id is not the URL for all teams
                        author_serializer.validated_data["host"] = remote_author["host"]
                        author_serializer.save()
                    else:
                        return Response({"error": "Invalid author"}, status = status.HTTP_400_BAD_REQUEST)
                    
                follow_requester = Author.objects.get(displayName=remote_author["displayName"], host=remote_author["host"])

            author_to_follow = Author.objects.get(id=request.data["object"])

            if inbox.follows.filter(actor=follow_requester, object=author_to_follow).exists():
                return Response({"error": "Follow already sent to inbox"}, status = status.HTTP_409_CONFLICT)
            else:
                follow = Follow.objects.create(
                    summary=request.data["summary"],
                    actor=follow_requester,
                    object=author_to_follow
                )
                inbox.follows.add(follow)

                follow_serializer = FollowSerializer(follow)
                return Response(follow_serializer.data, status = status.HTTP_200_OK)

        elif request.data["type"] == "Like":
            like_author = Author.objects.get(id=request.data["author"])
            if inbox.likes.filter(author=like_author, object=request.data["object"]).exists():
                return Response({"error": "Like already sent to inbox"}, status = status.HTTP_409_CONFLICT)
            
            else:
                # Need to determine if the object being liked is a post or a comment
                if Post.objects.filter(id=request.data["object"]).exists():
                    object = Post.objects.get(id=request.data["object"])
                # else: 
                    #TODO: implement after Comments is done
                like = Like.objects.create(
                    summary=request.data["summary"],
                    author=like_author,
                    object=object.id
                )
                inbox.likes.add(like)

                like_serializer = LikeSerializer(like)
                return Response(like_serializer.data, status = status.HTTP_200_OK)
            
        elif request.data["type"] == "post":
            # I am assuming that the post is already created

            post = Post.objects.get(id=request.data["id"])
            inbox.posts.add(post)
            post_serializer = PostSerializer(post)
            return Response(post_serializer.data, status = status.HTTP_200_OK)
            
        elif request.data["type"] == "comment":
            #TODO: implement after Comments is done
            return Response({"error": "Not implemented"}, status = status.HTTP_501_NOT_IMPLEMENTED)
        
        return Response(status = status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        description="Clear the author's inbox.",
        responses={204: None},
        tags=["inbox"]
    )
    def delete(self, request, author_id):
        """
        Clear the author's inbox.
        """
        inbox = Inbox.objects.get(author=author_id)
        inbox.posts.clear()
        inbox.follows.all().delete()
        inbox.likes.clear()
        # inbox.comments.clear() #TODO: implement after Comments is done

        return Response(status = status.HTTP_204_NO_CONTENT)
        