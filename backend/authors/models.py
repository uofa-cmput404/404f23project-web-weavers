from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class AuthorManager(BaseUserManager):
     def create_user(self, displayName,password=None, **kwargs):
        """Create and return an `Author` with a username and password."""
        if displayName is None:
            raise TypeError('Users must have a username.')
        user = self.model(displayName=displayName, **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user
     def create_superuser(self, displayName, password):
        """
        Create and return an `Author` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if displayName is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(displayName,  password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class Author(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=50, default="author")
    id = models.URLField(max_length=200, unique=True, null=True,editable=False)
    host = models.URLField(max_length=200, default="http://127.0.0.1:8000/")
    displayName = models.CharField(max_length=100, default="displayName", unique=True)
    url = models.URLField(max_length=200, unique=True, editable=False) 
    github = models.URLField(max_length=200, blank=True)
    profileImage = models.URLField(max_length=100, blank=True)
    followers = models.ManyToManyField("self", symmetrical=False, blank=True)
    inbox = models.JSONField(default=list, blank=True)

    email = models.EmailField(max_length=100, blank=True)  # do we need this? we dont even require email for registration
    password=models.CharField(max_length=100, blank=True, null=False, editable=False, default='')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) # an admin user
    USERNAME_FIELD = 'displayName'

    objects = AuthorManager()

    def __str__(self) -> str:
        return self.displayName
    
    def save(self, *args, **kwargs):
        # When the object is instantiated, set the id and url fields using the host and uuid
        if not self.id:
            self.id = self.host + "authors/" + str(self.uuid)
            self.url = self.host + "authors/" + str(self.uuid)
        super().save(*args, **kwargs)
