from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from post.serializers import PostSerializer
from likes.serializers import LikeSerializer
from rest_framework.response import Response
from rest_framework import status
from authors.models import Author
from likes.models import Like
from post.models import Post
from drf_spectacular.utils import extend_schema

# Create your views here.
class InboxView(APIView, PageNumberPagination):
    # TODO add authentication
    @extend_schema(
        description="List all posts (post, follow requests, like, comment) sent to the author.",
        responses={200: PostSerializer(many=True)}
    )
    def get(self, request, author_id):
        """
        List all posts (post, follow requests, like, comment) sent to the author.
        """
        # Pagination settings
        self.page_size_query_param = 'size'
        self.page_size = 10 # default page size
        self.max_page_size = 100

        author = Author.objects.get(pk=author_id)
        
        # if a page query is provided, paginate the results
        if self.get_page_number(request, self):
            # results are paginated either by the default page size or the page size query parameter
            if self.get_page_size(request):
                inbox_posts = self.paginate_queryset(author.inbox, request)

        return Response({
            "type": "inbox",
            "author": author.id,
            "items": inbox_posts
        })
    
    @extend_schema(
        description="Send a post, follow request, like or comment to the author's inbox.",
        request=PostSerializer,
        responses={200: PostSerializer()}
    )
    def post(self, request, author_id):
        """
        Send a post, follow request, like or comment to the author's inbox.
        """
        author = Author.objects.get(pk=author_id)
        if request.data["type"] == "Like":
            like_author = Author.objects.get(pk=request.data["author"])
            if Like.objects.filter(author=like_author, object=request.data["object"]).exists():
                return Response({"error": "Like already sent to inbox"}, status = status.HTTP_409_CONFLICT)
            
            like_serializer = LikeSerializer(data=request.data)
            if like_serializer.is_valid():
                like_serializer.validated_data["author"] = like_author
                like_serializer.save()
                # add the like to the author's inbox
                author.inbox.append(request.data)
                author.save()
                return Response(like_serializer.data, status = status.HTTP_200_OK)
            
        elif request.data["type"] == "post":
            # I am not sure if it makes sense to create a new post object
            # if we are sending a post to the inbox
            # we might also need to update the origin and source
            post_serializer = PostSerializer(data=request.data)
            if post_serializer.is_valid():
                post_serializer.save()
                # add the post to the author's inbox
                author.inbox.append(request.data)
                author.save()
                return Response(post_serializer.data, status = status.HTTP_200_OK)
            
            return Response(post_serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        return Response(status = status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        description="Clear the author's inbox.",
        responses={204: None}
    )
    def delete(self, request, author_id):
        """
        Clear the author's inbox.
        """
        author = Author.objects.get(pk=author_id)
        author.inbox = []
        author.save()

        return Response(status = status.HTTP_204_NO_CONTENT)
        