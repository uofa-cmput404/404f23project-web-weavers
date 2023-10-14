from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Author
from .serializers import AuthorSerializer

class AuthorList(APIView):
    """
    View to list all profiles on the server.
    """
    ## TODO @garynks: Add pagination and size limit
    def get(self, request):
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response({
            "type": "authors",
            "items": serializer.data
        })

class AuthorDetails(APIView):
    """
    View to retrieve or update a specific author's profile in the server.
    """
    def get(self, request, pk):
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author)
        return Response(serializer.data)
