from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from authors.models import Author
from authors.serializers import AuthorSerializer
from drf_spectacular.utils import extend_schema
from nodes.permissions import IsAuthorizedNode

class FollowersList(APIView):
    """
    View to list all followers of a user on the server.
    """
    permission_classes = [IsAuthenticated | IsAuthorizedNode]

    @extend_schema(
        description="Get all followers of an author",
        responses={200: AuthorSerializer(many=True)},
        tags=["followers"]
    )
    def get(self, request, author_id):
        try:
            author = Author.objects.get(pk=author_id)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        followers = author.followers.all()
        serializer = AuthorSerializer(followers, many=True)
        return Response({
            "type": "followers", 
            "items": serializer.data
        })

class FollowerDetails(APIView):
    permission_classes = [IsAuthenticated | IsAuthorizedNode]
    
    @extend_schema(
        description="Returns true if the foreign author is a follower of the author, false otherwise",
        responses={200: bool},
        tags=["followers"]
    )
    def get(self, request, author_id, foreign_author_id):
        try:
            author = Author.objects.get(pk=author_id)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if author.followers.filter(pk=foreign_author_id).exists():
            return Response({"is_follower": True})
        else:
            return Response({"is_follower": False})

    @extend_schema(
        description="Adds the foreign author as a follower of the author",
        responses={200: "Successfully added follower"},
        tags=["followers"]
    )
    def put(self, request, author_id, foreign_author_id):
        follow_recipient = Author.objects.get(pk=author_id)
        if request.user != follow_recipient:
            return Response({"error": "You are not authorized to add followers to this author"}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            author = Author.objects.get(pk=author_id)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if not author.followers.filter(pk=foreign_author_id).exists():
            follower = Author.objects.get(pk=foreign_author_id)
            author.followers.add(follower)
        else:
            return Response({"error": "Follower already exists"}, status=status.HTTP_409_CONFLICT)
        
        return Response({"message": "Successfully added follower"}, status=status.HTTP_200_OK)  

    @extend_schema(
        description="Removes the foreign author as a follower of the author",
        responses={204: None},
        tags=["followers"]
    )
    def delete(self, request, author_id, foreign_author_id):
        try:
            author = Author.objects.get(pk=author_id)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if author.followers.filter(pk=foreign_author_id).exists():
            follower = author.followers.get(pk=foreign_author_id)
            author.followers.remove(follower)
        else:
            return Response({"error": "Follower not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(status=status.HTTP_204_NO_CONTENT)

@extend_schema(
    description="List all friends of the author",
    responses={200: AuthorSerializer(many=True)},
    tags=["followers"]
)
@api_view(['GET'])
def list_friends(request, author_id):
    try:
        author = Author.objects.get(pk=author_id)
    except Author.DoesNotExist:
        return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
    
    friends = []
    for follower in author.followers.all():
        if author in follower.followers.all():
            friends.append(follower)

    serializer = AuthorSerializer(friends, many=True)
    return Response({
        "type": "friends", 
        "items": serializer.data
    })

