from django.db import models
import uuid
from authors.models import Author

class Post(models.Model):
    type = models.CharField(max_length=200, default="post")
    title = models.CharField(max_length=200)
    id = models.URLField(primary_key=True, default=uuid.uuid4, editable=False)     
    source = models.URLField()
    origin = models.URLField()
    description = models.CharField(max_length=200)
    contentType = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = models.ArrayField()
    count = models.IntegerField()
    comments = models.URLField()
    commentsSrc = models.JSONField(null=True, blank=True) # TODO: will be replaced by the Comment model when implemented
    published = models.DateTimeField()
    visibility = models.CharField(max_length=255)
    unlisted = models.BooleanField()

    

# Create your models here.
