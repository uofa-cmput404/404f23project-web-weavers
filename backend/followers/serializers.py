from rest_framework import serializers
from .models import Follow
from authors.serializers import AuthorSerializer

class FollowSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Follow
        exclude = ['id']
