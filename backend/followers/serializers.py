from rest_framework import serializers
from .models import Follow
from authors.serializers import AuthorSerializer

class FollowSerializer(serializers.ModelSerializer):
    actor = AuthorSerializer(read_only=True)
    object = AuthorSerializer(read_only=True)

    class Meta:
        model = Follow
        exclude = ['id']
