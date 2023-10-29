from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Comment
from post.models import Post
from authors.models import Author
from .serializers import CommentSerializer
from rest_framework.pagination import PageNumberPagination
import uuid

# Create your views here.
class CommentList(APIView, PageNumberPagination):
    def get(self, request, author_id, post_id):
        """
        Get all comments for a post
        """
        self.page_size = 10
        self.page_size_query_param = 'size'
        self.max_page_size = 100

        author = Author.objects.get(pk=author_id)
        post = Post.objects.get(pk=post_id)
        comments = Comment.objects.filter(author=author,post=post)

        if self.get_page_number(request, self):
            if self.get_page_size(request):
                comments = self.paginate_queryset(comments, request)

        serializer = CommentSerializer(comments, many=True)
        return Response({
            "type" : "comments",
            "items" : serializer.data,
        })
    
    def post(self, request, author_id, post_id):
        """
        Create a new comment
        """
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            author = Author.objects.get(pk=author_id)
            post = Post.objects.get(pk=post_id)
            new_comment_id = uuid.uuid4()

            comment_url = post.url + "/comments/" + str(new_comment_id)
            serializer.validated_data['id'] = new_comment_id
            serializer.validated_data['author'] = author
            serializer.validated_data['post'] = post
            serializer.validated_data['id'] = comment_url
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


        
    