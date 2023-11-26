from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from post.serializers import PostSerializer
from likes.serializers import LikeSerializer
from rest_framework.response import Response
from rest_framework import status
from authors.models import Author
from inbox.models import Inbox
from followers.models import Follow
from post.models import Post
from likes.models import Like
from followers.serializers import FollowSerializer
from drf_spectacular.utils import extend_schema

# Create your views here.
@extend_schema(
    description="List all follows sent to the author's inbox.",
    responses={200: FollowSerializer(many=True)}
)
@api_view(['GET'])
def list_follows_from_inbox(request, author_id):
    
    inbox = Inbox.objects.get(author=author_id)
    inbox_follows = inbox.follows.all()

    follow_serializer = FollowSerializer(inbox_follows, many=True)
    response = Response({
        "type": "inbox",
        "author": inbox.author.url,
        "items": follow_serializer.data
    })
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    return response

@extend_schema(
    description="List all likes sent to the author's inbox.",
    responses={200: LikeSerializer(many=True)}
)
@api_view(['GET'])
def list_likes_from_inbox(request, author_id):
    inbox = Inbox.objects.get(author=author_id)
    inbox_likes = inbox.likes.all()

    like_serializer = LikeSerializer(inbox_likes, many=True)
    response = Response({
        "type": "inbox",
        "author": inbox.author.url,
        "items": like_serializer.data
    })
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    return response

# TODO: implement after Comments is done
# @extend_schema(
#     description="List all comments sent to the author's inbox.",
#     responses={200: CommentSerializer(many=True)}
# )
# @api_view(['GET'])
# def list_comments_from_inbox(self, request, author_id):
#     pass

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
    # TODO add authentication
    @extend_schema(
        description="List all posts sent to the author's inbox.",
        responses={200: PostSerializer(many=True)}
    )
    def get(self, request, author_id):
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
        response = Response({
            "type": "inbox",
            "author": inbox.author.url,
            "items": post_serializer.data
        })
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return response
    
    @extend_schema(
        description="Send a post, follow request, like or comment to the author's inbox.",
        request=PostSerializer,
        responses={200: PostSerializer()}
    )
    def post(self, request, author_id):
        """
        Send a post, follow request, like or comment to the author's inbox.
        """
        inbox = Inbox.objects.get(author=author_id)

        if request.data["type"] == "Follow":
            follow_requester = Author.objects.get(id=request.data["actor"])
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
                response = Response(follow_serializer.data, status = status.HTTP_200_OK)
                response["Access-Control-Allow-Origin"] = "http://localhost:3000"
                return response

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
                response = Response(like_serializer.data, status = status.HTTP_200_OK)
                response["Access-Control-Allow-Origin"] = "http://localhost:3000"
                return response
            
        elif request.data["type"] == "post":
            # I am assuming that the post is already created

            post = Post.objects.get(id=request.data["id"])
            inbox.posts.add(post)
            post_serializer = PostSerializer(post)
            response = Response(post_serializer.data, status = status.HTTP_200_OK)
            response["Access-Control-Allow-Origin"] = "http://localhost:3000"
            return response
            
        elif request.data["type"] == "comment":
            #TODO: implement after Comments is done
            response = Response({"error": "Not implemented"}, status = status.HTTP_501_NOT_IMPLEMENTED)
            response["Access-Control-Allow-Origin"] = "http://localhost:3000"
            return response
        
        response = Response(status = status.HTTP_400_BAD_REQUEST)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return response
    
    @extend_schema(
        description="Clear the author's inbox.",
        responses={204: None}
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

        response = Response(status = status.HTTP_204_NO_CONTENT)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return response
        