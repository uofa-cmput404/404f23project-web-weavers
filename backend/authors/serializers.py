from rest_framework import serializers
from .models import Author

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        # exclude = ['uuid']
        fields = ["uuid",'displayName', 'is_active']
        # read_only_field = ['is_active', 'created', 'updated']
