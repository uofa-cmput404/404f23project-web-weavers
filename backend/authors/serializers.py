from rest_framework import serializers
from .models import Author

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        exclude = ['followers', 'is_superuser', "user_permissions", "groups", 'is_staff', "password", "email", "last_login",]
