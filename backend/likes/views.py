from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Like
from .serializers import LikeSerializer
from authors.models import Author
from comments.models import Comment
from post.models import Post
from drf_spectacular.utils import extend_schema
from nodes.permissions import IsAuthorizedNode

# Create your views here.
@extend_schema(
    description="List all likes of an author.",
    responses={200: LikeSerializer(many=True)},
    tags=["likes"]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAuthorizedNode])
def list_author_likes(request, author_id):
    """
    List all likes of an author
    """
    author = Author.objects.get(pk=author_id)
    likes = Like.objects.filter(author=author).all()
    serializer = LikeSerializer(likes, many=True)
    return Response({
        "type": "liked",
        "items": serializer.data
    })
    
@extend_schema(
    description="List all likes of a post.",
    responses={200: LikeSerializer(many=True)},
    tags=["likes"]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAuthorizedNode])
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
    responses={200: LikeSerializer(many=True)},
    tags=["likes"]
) 
@api_view(['GET'])
@permission_classes([IsAuthenticated | IsAuthorizedNode])
def list_comment_likes(request, author_id, post_id, comment_id):
    """
    List all likes of a comment
    """
    author = Author.objects.get(pk=author_id)
    # get the comment url
    comment = Comment.objects.get(pk=comment_id)
    comment_likes = Like.objects.filter(object=comment.id).exclude(author=author).all()
    serializer = LikeSerializer(comment_likes, many=True)
    return Response({
        "type": "likes",
        "items": serializer.data
    })
