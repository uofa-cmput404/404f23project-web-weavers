from django.shortcuts import render
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination

# Create your views here.

class PostList(APIView, PageNumberPagination):

    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_query_param = 'size'
        paginator.page_size = 10
        paginator.max_page_size = 100
        
        posts = Post.objects.all()
        
        if self.get_page_number(request, self):
            if self.get_page_size(request, self):
                posts = self.paginate_queryset(posts, request)
        serializer = PostSerializer(posts, many=True)
        return Response({
            "type": "posts",
            "items": serializer.data,
        })

class PostDetail(APIView):

    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    def post(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def delete(self, request, pk):
        post = Post.objects.get(id=pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


