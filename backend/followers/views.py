from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from authors.models import Author
from authors.serializers import AuthorSerializer

class FollowersList(APIView):
    """
    View to list all followers of a user on the server.
    """
    def get(self, request, pk):
        try:
            author = Author.objects.get(pk=pk)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        followers = author.followers.all()
        serializer = AuthorSerializer(followers, many=True)
        return Response({
            "type": "followers", 
            "items": serializer.data
        })

class FollowerDetails(APIView):
    def get(self, request, pk, foreign_author_id):
        try:
            author = Author.objects.get(pk=pk)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if author.followers.filter(pk=foreign_author_id).exists():
            return Response({
                    "is_follower": True
                })
        else:
            return Response({
                    "is_follower": False
                })

    def put(self, request, pk, foreign_author_id):
        #TODO implement authentication for this route
        try:
            author = Author.objects.get(pk=pk)
            follower = Author.objects.get(pk=foreign_author_id)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        author.followers.add(follower)
        return Response({
            "message": "Successfully added follower"
        }, status=status.HTTP_200_OK)  

    def delete(self, request, pk, foreign_author_id):
        try:
            author = Author.objects.get(pk=pk)
            follower = Author.objects.get(pk=foreign_author_id)
        except Author.DoesNotExist:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        
        author.followers.remove(follower)
        return Response(status=status.HTTP_204_NO_CONTENT)

