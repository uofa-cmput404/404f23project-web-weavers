from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Comment
from post.models import Post
from authors.models import Author
from nodes.permissions import IsAuthorizedNode
from .serializers import CommentSerializer
from rest_framework.pagination import PageNumberPagination
import uuid
from drf_spectacular.utils import extend_schema


# Create your views here.
class CommentList(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated | IsAuthorizedNode]

    @extend_schema(
        description="List all comments for a post.",
        responses={200: CommentSerializer(many=True)},
        tags=["comments"]
    )
    def get(self, request, author_id, post_id):
        """
        Get all comments for a post
        """
        self.page_size = 10
        self.page_size_query_param = 'size'
        self.max_page_size = 100

        author = Author.objects.get(pk=author_id)
        post = Post.objects.get(pk=post_id)
        comments = Comment.objects.filter(post=post).order_by('-published')

        if self.get_page_number(request, self):
            if self.get_page_size(request):
                comments = self.paginate_queryset(comments, request)

        serializer = CommentSerializer(comments, many=True)
        return Response({
            "type" : "comments",
            "id" : str(post.id) + "/comments/",
            "items" : serializer.data,
        })
    
    @extend_schema(
        description="Create a new comment",
        request=CommentSerializer,
        responses={201: CommentSerializer()},
        tags=["comments"]
    )
    def post(self, request, author_id, post_id):
        """
        Create a new comment
        """
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            author = Author.objects.get(pk=author_id)
            post = Post.objects.get(pk=post_id)
            new_comment_id = uuid.uuid4()

            comment_url = author.url + "posts/" + str(post_id) + "/comments/" + str(new_comment_id)
            serializer.validated_data['author'] = author
            serializer.validated_data['post'] = post
            serializer.validated_data['id'] = comment_url
            serializer.save()

            post.comments = comment_url
            post.count += 1
            post.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


        
    