from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Like
from .serializers import LikeSerializer
from authors.models import Author

# Create your views here.
@api_view(['GET'])
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
    
@api_view(['GET'])
def list_post_likes(request, author_id, post_id):
    """
    List all likes of a post
    """
    author = Author.objects.get(pk=author_id)
    # get the post url
    url = request.build_absolute_uri()
    likes_index = url.rindex("/likes")
    post_url = url[:likes_index]
    post_likes = Like.objects.filter(object=post_url).exclude(author=author).all()
    serializer = LikeSerializer(post_likes, many=True)
    return Response({
        "type": "likes",
        "items": serializer.data
    })

@api_view(['GET'])
def list_comment_likes(request, author_id, post_id, comment_id):
    """
    List all likes of a comment
    """
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
