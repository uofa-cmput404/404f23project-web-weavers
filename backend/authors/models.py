from django.db import models
import uuid

# Create your models here.
class Author(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=50, default="author")
    id = models.URLField(max_length=200, unique=True, editable=False)
    host = models.URLField(max_length=200, default="http://127.0.0.1:8000/")
    displayName = models.CharField(max_length=100)
    url = models.URLField(max_length=200, unique=True, editable=False)
    github = models.URLField(max_length=200, blank=True)
    profileImage = models.URLField(max_length=100, blank=True)
    followers = models.ManyToManyField("self", blank=True)

    def __str__(self) -> str:
        return self.displayName

    def save(self, *args, **kwargs):
        # When the object is instantiated, set the id and url fields using the host and uuid
        if not self.id:
            self.id = self.host + "authors/" + str(self.uuid)
            self.url = self.host + "authors/" + str(self.uuid)
        super().save(*args, **kwargs)
