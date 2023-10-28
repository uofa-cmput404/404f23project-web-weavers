from django.utils import timezone
import uuid
from django.db import models
from post.models import Post
from authors.models import Author

# Create your models here.
class Comment(models.Model):
    type = models.CharField(max_length=300, blank=True, default="comment")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
    comment = models.TextField()
    contentType = models.CharField(max_length=300, default="text/plain")
    published = models.DateTimeField(auto_now_add=True, default=timezone.now)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
