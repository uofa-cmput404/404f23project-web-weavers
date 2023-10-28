from django.utils import timezone
import uuid
from django.db import models
from post.models import Post
from authors.models import Author

# Create your models here.
class Comment(models.Model):
    CT_MARKDOWN = 'text/markdown'
    CT_PLAIN = 'text/plain'
    CONTENT_TYPE_CHOICES = [
        (CT_MARKDOWN, 'Markdown'),
        (CT_PLAIN, 'Plain Text')
    ]
    type = models.CharField(max_length=300, blank=True, default="comment")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
    comment = models.TextField()
    contentType = models.CharField(
        max_length=200,
        choices=CONTENT_TYPE_CHOICES,
        default=CT_MARKDOWN
        )
    published = models.DateTimeField(default=timezone.now)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
