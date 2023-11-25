from rest_framework import permissions
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from .models import Node
import base64

class IsAuthorizedNode(permissions.BasePermission):
    """
    Custom permission to only allow authorized nodes to access the view.
    """

    # https://www.djangosnippets.org/snippets/243/
    def has_permission(self, request, view):
        if "HTTP_AUTHORIZATION" in request.META:
            auth_type, auth_string = request.META["HTTP_AUTHORIZATION"].split(" ")
            if auth_type == "Basic":
                username, password = base64.b64decode(auth_string).decode().split(":")
                return Node.objects.filter(username=username, password=password).exists()
            
        # Allow localhost connections
        if "HTTP_HOST" in request.META:
            if request.META["HTTP_HOST"] in ["127.0.0.1:8000", "localhost:8000"]:
                return True
            
        raise NotAuthenticated(detail="Unauthorized Node")

# class AllowNodeToPost(permissions.BasePermission):
#     """
#     Custom permission to allow nodes to post only.
#     """

#     def has_permission(self, request, view):
#         if request.method != "POST":
#             raise PermissionDenied(detail="Only POST requests are allowed")
#         return True
        
    
# class AllowNodeToGet(permissions.BasePermission):
#     """
#     Custom permission to only allow nodes to get only.
#     """

#     def has_permission(self, request, view):
#         if request.method != "GET":
#             raise PermissionDenied(detail="Only GET requests are allowed")
#         return True
        
