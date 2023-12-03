from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from authors.serializers import AuthorSerializer
from post.serializers import PostSerializer
from likes.serializers import LikeSerializer
from followers.serializers import FollowSerializer
from comments.serializers import CommentSerializer
from rest_framework.response import Response
from rest_framework import status
from authors.models import Author
from inbox.models import Inbox
from followers.models import Follow
from post.models import Post
from likes.models import Like
from comments.models import Comment
from nodes.permissions import IsAuthorizedNode
from drf_spectacular.utils import extend_schema
import requests
from requests.auth import HTTPBasicAuth

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

@extend_schema(
    description="List all comments sent to the author's inbox.",
    responses={200: CommentSerializer(many=True)}
)
@permission_classes([IsAuthenticated | IsAuthorizedNode])
@api_view(['GET'])
def list_comments_from_inbox(request, author_id):
    inbox_owner = Author.objects.get(pk=author_id)
    if request.user != inbox_owner:
        return Response({"error": "You are not authorized to access this inbox"}, status = status.HTTP_403_FORBIDDEN)

    inbox = Inbox.objects.get(author=author_id)
    inbox_comments = inbox.comments.all()

    comment_serializer = CommentSerializer(inbox_comments, many=True)
    return Response({
        "type": "inbox",
        "author": inbox.author.url,
        "items": comment_serializer.data
    })

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
            print("hit wrong owner")
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

                if remote_author_url.startswith("https://c404-5f70eb0b3255.herokuapp.com"):
                    headers = {'Authorization': 'Bearer 06c591151b14e0462efd2ad9c91888a530967c7f'} 
                elif remote_author_url.startswith("https://beeg-yoshi-backend-858f363fca5e.herokuapp.com"):
                    headers = {'Authorization': 'Token bcad92d727cc40cd0435370dd285f9b82626890b'}
                elif remote_author_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
                    remote_author = requests.get(remote_author_url, auth=HTTPBasicAuth('WebWeavers', '12345')).json()
                else:
                    headers = {}

                # For teams using Django, it will be necessary to add a trailing slash to the URL
                if not remote_author_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
                    if remote_author_url.endswith("/"):
                        remote_author = requests.get(remote_author_url, headers).json()
                        remote_author_url = remote_author_url[:-1]
                    else:
                        remote_author = requests.get(remote_author_url + "/", headers).json()

                if not Author.objects.filter(displayName=remote_author["displayName"], host=remote_author["host"]).exists():
                    author_serializer = AuthorSerializer(data=remote_author)
                    if author_serializer.is_valid():
                        # if the author's id is not a URL, then it is a ID
                        if not remote_author["id"].startswith("http"):
                            author_serializer.validated_data["uuid"] = remote_author["id"]
                        else:
                            # extract uuid from the URL
                            author_serializer.validated_data["uuid"] = remote_author["id"].split("/")[-1]

                        author_serializer.validated_data["id"] = remote_author_url
                        author_serializer.validated_data["url"] = remote_author_url
                        author_serializer.validated_data["host"] = remote_author["host"]
                        author_serializer.save()
                    else:
                        return Response(author_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
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
            try:
                like_sender = Author.objects.get(id=request.data["author"])
            except Author.DoesNotExist:
                remote_author_url = request.data["author"]

                if remote_author_url.startswith("https://c404-5f70eb0b3255.herokuapp.com"):
                    headers = {'Authorization': 'Bearer 06c591151b14e0462efd2ad9c91888a530967c7f'} 
                elif remote_author_url.startswith("https://beeg-yoshi-backend-858f363fca5e.herokuapp.com"):
                    headers = {'Authorization': 'Token bcad92d727cc40cd0435370dd285f9b82626890b'}
                elif remote_author_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
                    remote_author = requests.get(remote_author_url, auth=HTTPBasicAuth('WebWeavers', '12345')).json()
                else:
                    headers = {}

                # For teams using Django, it will be necessary to add a trailing slash to the URL
                if not remote_author_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
                    if remote_author_url.endswith("/"):
                        remote_author = requests.get(remote_author_url, headers).json()
                        remote_author_url = remote_author_url[:-1]
                    else:
                        remote_author = requests.get(remote_author_url + "/", headers).json()

                if not Author.objects.filter(displayName=remote_author["displayName"], host=remote_author["host"]).exists():
                    author_serializer = AuthorSerializer(data=remote_author)
                    if author_serializer.is_valid():

                        # if the author's id is not a URL, then it is a ID
                        if not remote_author["id"].startswith("http"):
                            author_serializer.validated_data["uuid"] = remote_author["id"]
                        else:
                            # extract uuid from the URL
                            author_serializer.validated_data["uuid"] = remote_author["id"].split("/")[-1]

                        author_serializer.validated_data["id"] = remote_author_url     # id is not the URL for all teams
                        author_serializer.validated_data["url"] = remote_author_url
                        author_serializer.validated_data["host"] = remote_author["host"]
                        author_serializer.save()
                    else:
                        return Response(author_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
                like_sender = Author.objects.get(displayName=remote_author["displayName"], host=remote_author["host"])
                    
            if inbox.likes.filter(author=like_sender, object=request.data["object"]).exists():
                return Response({"error": "Like already sent to inbox"}, status = status.HTTP_409_CONFLICT)

            else:
                # Need to determine if the object being liked is a post or a comment
                if Post.objects.filter(id=request.data["object"]).exists():
                    object = Post.objects.get(id=request.data["object"])
                elif Comment.objects.filter(id=request.data["object"]).exists():
                    object = Comment.objects.get(id=request.data["object"])
                else:
                    return Response({"error": "Object being liked does not exist"}, status = status.HTTP_404_NOT_FOUND)
                
                like = Like.objects.create(
                    summary=request.data["summary"],
                    author=like_sender,
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
            comment = Comment.objects.get(id=request.data["id"])
            inbox.comments.add(comment)
            comment_serializer = CommentSerializer(comment)
            return Response(comment_serializer.data, status = status.HTTP_200_OK)

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
        inbox.comments.clear()

        return Response(status = status.HTTP_204_NO_CONTENT)
