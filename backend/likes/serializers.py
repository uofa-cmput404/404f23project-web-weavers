from rest_framework import serializers
from .models import Like
from authors.serializers import AuthorSerializer

class LikeSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Like
        exclude = ['id']
