from django.db import models
import uuid
from author.models import Author

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=200, default="post")
    title = models.CharField(max_length=200)
    source = models.URLField()
    origin = models.URLField()
    description = models.CharField(max_length=200)
    contentType = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = models.JSONField()
    count = models.IntegerField()
    comments = models.URLField()
    published = models.DateTimeField()
    visibility = models.CharField(max_length=255)
    unlisted = models.BooleanField()

    commentsSrc = models.JSONField(null=True, blank=True)

# Create your models here.
