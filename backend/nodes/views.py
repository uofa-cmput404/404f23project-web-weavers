from rest_framework.views import APIView
from rest_framework.response import Response
from authors.serializers import AuthorSerializer
from .models import Node
import requests

# Create your views here.
class NodeList(APIView):
    # def get_authors(self, request):
    #     """ Get all authors from all nodes """
    #     if request.method != "GET":
    #         return Response(status=405)
        
    #     author_list = []
    #     for node in Node.objects.all():
    #         # Get all authors from node
    #         # Add to list of authors
    #         response = requests.get(node.host + "/authors/").json()

    #         # we need to include handling logic because each team 
    #         # have a different response format
    #         if node.team_name == "a team":
    #             author_list.append(response["results"]["items"])
    #         else:
    #             author_list.append(response["items"])

    #     serializer = AuthorSerializer(author_list, many=True)
    #     return Response({
    #         "type": "authors",
    #         "items": serializer.data
    #     })
    
    def get_hosts(self, request):
        """Get all hosts from all nodes """
        if request.method != "GET":
            return Response(status=405)
        
        host_dict = dict()
        for node in Node.objects.all():
            host_dict[node.team_name] = node.host
        
        return Response({
            "type": "hosts",
            "items": host_dict
        })    
