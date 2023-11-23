from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Like
from .serializers import LikeSerializer
from authors.models import Author
from post.models import Post
from drf_spectacular.utils import extend_schema
from nodes.permissions import IsAuthorizedNode, AllowNodeToGet

# Create your views here.
@extend_schema(
    description="List all likes of an author.",
    responses={200: LikeSerializer(many=True)}
)
@api_view(['GET'])
@permission_classes([IsAuthorizedNode])
def list_author_likes(request, author_id):
    """
    List all likes of an author
    """
    # TODO: Check that the likes are only from public things
    author = Author.objects.get(pk=author_id)
    likes = Like.objects.filter(author=author).all()
    serializer = LikeSerializer(likes, many=True)
    return Response({
        "type": "liked",
        "items": serializer.data
    })
    
@extend_schema(
    description="List all likes of a post.",
    responses={200: LikeSerializer(many=True)}
)
@api_view(['GET'])
@permission_classes([IsAuthorizedNode])
def list_post_likes(request, author_id, post_id):
    """
    List all likes of a post
    """
    author = Author.objects.get(pk=author_id)
    # get the post url
    post = Post.objects.get(pk=post_id)
    post_likes = Like.objects.filter(object=post.id).exclude(author=author).all()
    serializer = LikeSerializer(post_likes, many=True)
    return Response({
        "type": "likes",
        "items": serializer.data
    })

@extend_schema(
    description="List all likes of a comment.",
    responses={200: LikeSerializer(many=True)}
) 
@api_view(['GET'])
@permission_classes([IsAuthorizedNode])
def list_comment_likes(request, author_id, post_id, comment_id):
    """
    List all likes of a comment
    """
    # TODO: Change implementation to use Comment model instead of getting
    # the comment url from the full url
    author = Author.objects.get(pk=author_id)
    # get the comment url
    url = request.build_absolute_uri()
    likes_index = url.rindex("/likes")
    comment_url = url[:likes_index]
    
    comment_likes = Like.objects.filter(object=comment_url).exclude(author=author).all()
    serializer = LikeSerializer(comment_likes, many=True)
    return Response({
        "type": "likes",
        "items": serializer.data
    })
