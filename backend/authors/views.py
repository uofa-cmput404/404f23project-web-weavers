<<<<<<< HEAD
=======
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view 
from rest_framework import viewsets
from .models import Author
from .serializers import AuthorSerializer
from rest_framework.pagination import PageNumberPagination
>>>>>>> Dev

from authors.serializers import AuthorSerializer
from authors.models import Author
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters


<<<<<<< HEAD
class AuthorViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = AuthorSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Author.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Author.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
    

# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import Author
# from .serializers import AuthorSerializer
# from rest_framework.pagination import PageNumberPagination

# class AuthorList(APIView, PageNumberPagination):
#     """
#     View to list all profiles on the server.
#     """
#     def get(self, request):
#         # Pagination settings
#         self.page_size_query_param = 'size'
#         self.page_size = 10 # default page size
#         self.max_page_size = 100

#         authors = Author.objects.all().order_by('displayName')

#         # if a page query is provided, paginate the results
#         if self.get_page_number(request, self):
#             # results are paginated either by the default page size or the page size query parameter
#             if self.get_page_size(request):
#                 authors = self.paginate_queryset(authors, request)
#         serializer = AuthorSerializer(authors, many=True)
#         return Response({
#             "type": "authors",
#             "items": serializer.data
#         })

# class AuthorDetails(APIView):
#     """
#     View to retrieve or update a specific author's profile in the server.
#     """
#     def get(self, request, pk):
#         author = Author.objects.get(pk=pk)
#         serializer = AuthorSerializer(author)
#         return Response(serializer.data)

#     def post(self, request, pk):
#         author = Author.objects.get(pk=pk)
#         serializer = AuthorSerializer(author, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)
=======
        # if a page query is provided, paginate the results
        if self.get_page_number(request, self):
            # results are paginated either by the default page size or the page size query parameter
            if self.get_page_size(request):
                authors = self.paginate_queryset(authors, request)
        serializer = AuthorSerializer(authors, many=True)
        response = Response({
            "type": "authors",
            "items": serializer.data
        })
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return response

class AuthorDetails(APIView):
    """
    View to retrieve or update a specific author's profile in the server.
    """
    def get(self, request, pk):
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author)
        response = Response(serializer.data)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        return response

    def post(self, request, pk):
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = Response(serializer.data)
            response["Access-Control-Allow-Origin"] = "http://localhost:3000"
            return response
        return Response(serializer.errors)
>>>>>>> Dev
