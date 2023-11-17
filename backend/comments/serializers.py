from rest_framework import serializers
from .models import Comment
from authors.serializers import AuthorSerializer

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        exclude = ['uuid']