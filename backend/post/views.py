from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from authors.models import Author
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination
from drf_spectacular.utils import extend_schema
import uuid
from nodes.permissions import IsAuthorizedNode
import base64
from PIL import Image
from io import BytesIO
from django.http import HttpResponse

# Create your views here.
class PostList(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated | IsAuthorizedNode]

    @extend_schema(
        description="List all posts.",
        responses={200: PostSerializer(many=True)},
        tags=["posts"]
    )
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
        posts = Post.objects.filter(author=author, visibility="PUBLIC", unlisted=False).order_by('-published')

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
    
    @extend_schema(
        description="Create a new post with a new id.",
        request=PostSerializer,
        responses={201: PostSerializer()},
        tags=["posts"]
    )
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
    permission_classes = [IsAuthenticated | IsAuthorizedNode]
    
    @extend_schema(
        description="Retrieve a post.",
        responses={200: PostSerializer()},
        tags=["posts"]
    )
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
    
    @extend_schema(
        description="Update a post.",
        request=PostSerializer,
        responses={200: PostSerializer()},
        tags=["posts"]
    )
    def post(self, request, author_id, post_id):
        """
        Update a post.
        """
        post_owner = Author.objects.get(pk=author_id)
        if request.user != post_owner:
            return Response({"error": "You are not authorized to update this post"}, status=status.HTTP_403_FORBIDDEN)
        
        author = Author.objects.get(pk=author_id)
        post = Post.objects.get(pk=post_id, author=author)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    @extend_schema(
        description="Creates a post with a specific id.",
        request=PostSerializer,
        responses={201: PostSerializer()},
        tags=["posts"]
    )
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
    
    @extend_schema(
        description="Delete a post.",
        responses={204: None},
        tags=["posts"]
    )
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

@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAuthorizedNode])
@extend_schema(
    description="List all public posts on the node.",
    responses={200: PostSerializer(many=True)},
    tags=["posts"]
)
def list_public_posts(request):
    """
    List all public posts on the node.
    """
    hosts_to_exclude = ["https://c404-5f70eb0b3255.herokuapp.com/", "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/", "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"]
    public_posts = Post.objects.filter(visibility="PUBLIC", unlisted=False).all().order_by('-published').exclude(author__host__in=hosts_to_exclude)
    serializer = PostSerializer(public_posts, many=True)
    return Response({
        "type": "posts",
        "items": serializer.data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAuthorizedNode])
@extend_schema(
    description="Get image.",
    responses={200: None},
    tags=["posts"]
)
def get_image(request, author_id, post_id):
    author = Author.objects.get(pk=author_id)
    try:
        post = Post.objects.get(pk=post_id, author=author)
    except:
        return Response({"error": "Post Not Found"}, status=status.HTTP_404_NOT_FOUND)
    
    if post.contentType == "image/png;base64":
        image = Image.open(BytesIO(base64.b64decode(post.content)))
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        return HttpResponse(buffer.getvalue(), status=status.HTTP_200_OK, content_type="image/png")
    elif post.contentType == "image/jpeg;base64":
        image = Image.open(BytesIO(base64.b64decode(post.content)))
        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        return HttpResponse(buffer.getvalue(), status=status.HTTP_200_OK, content_type="image/jpeg")
    else:
        return Response({"error": "Post is not an image"}, status=status.HTTP_400_BAD_REQUEST)
