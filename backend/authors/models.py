from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class AuthorManager(BaseUserManager):
     def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user
     def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class Author(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True, default="username")
    type = models.CharField(max_length=50, default="author")
    id = models.URLField(max_length=200, unique=True, editable=False)
    host = models.URLField(max_length=200, default="http://127.0.0.1:8000/")
    displayName = models.CharField(max_length=100)
    url = models.URLField(max_length=200, unique=True, editable=False)
    github = models.URLField(max_length=200, blank=True)
    profileImage = models.URLField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, unique=True, blank=True)
    password=models.CharField(max_length=100, blank=True, null=False, editable=False, default='')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'


    objects = AuthorManager()

    def __str__(self) -> str:
        return self.displayName

