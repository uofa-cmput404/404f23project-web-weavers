from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from authors.models import Author
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination
import uuid

# Create your views here.
class PostList(APIView, PageNumberPagination):
    def get(self, request, author_id):
        """
        List all posts.
        """
        # Pagination settings
        self.page_size_query_param = 'size'
        self.page_size = 10 # default page size
        self.max_page_size = 100

        author = Author.objects.get(pk=author_id)
        # get the latest public posts from the author
        posts = Post.objects.filter(author=author, visibility="PUBLIC").order_by('-published')

        # if a page query is provided, paginate the results
        if self.get_page_number(request, self):
            # results are paginated either by the default page size or the page size query parameter
            if self.get_page_size(request):
                posts = self.paginate_queryset(posts, request)

        serializer = PostSerializer(posts, many=True)
        return Response({
            "type": "posts",
            "items": serializer.data
        })
    
    def post(self, request, author_id):
        """
        Create a new post with a new id.
        """
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            author = Author.objects.get(pk=author_id)
            new_post_id = uuid.uuid4()

            post_url = author.url + "/posts/" + str(new_post_id)
            serializer.validated_data["uuid"] = new_post_id
            serializer.validated_data["author"] = author
            serializer.validated_data["id"] = post_url
            serializer.validated_data["source"] = post_url
            serializer.validated_data["origin"] = post_url
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors)
    
class PostDetails(APIView):
    def get(self, request, author_id, post_id):
        """
        Retrieve a post.
        """
        author = Author.objects.get(pk=author_id)
        try:
            post = Post.objects.get(pk=post_id, author=author, visibility="PUBLIC")
        except:
            return Response({"error": "Post Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    def post(self, request, author_id, post_id):
        """
        Update a post.
        """
        # TODO: Implement authentication for this endpoint
        author = Author.objects.get(pk=author_id)
        post = Post.objects.get(pk=post_id, author=author)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def put(self, request, author_id, post_id):
        """
        Creates a post with a specific id.
        """
        if Post.objects.filter(pk=post_id).exists():
            return Response({"error": "A post already exists with the given id"}, status=status.HTTP_409_CONFLICT)
        
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            author = Author.objects.get(pk=author_id)
            post_url = author.url + "/posts/" + str(post_id)

            serializer.validated_data["uuid"] = post_id
            serializer.validated_data["author"] = author
            serializer.validated_data["id"] = post_url
            serializer.validated_data["source"] = post_url
            serializer.validated_data["origin"] = post_url
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors)
    
    def delete(self, request, author_id, post_id):
        """
        Delete a post.
        """
        author = Author.objects.get(pk=author_id)
        try:
            post = Post.objects.get(pk=post_id, author=author)
        except:
            return Response({"error": "Post Not Found"}, status=status.HTTP_404_NOT_FOUND)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)