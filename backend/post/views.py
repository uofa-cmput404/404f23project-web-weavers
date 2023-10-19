from django.shortcuts import render
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination

class PostList(APIView, PageNumberPagination):
    

# Create your views here.


