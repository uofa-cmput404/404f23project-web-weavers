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
    id = models.URLField(max_length=200, unique=True, editable=False)
    type = models.CharField(max_length=300, blank=True, default="comment")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    comment = models.TextField()
    contentType = models.CharField(
        max_length=200,
        choices=CONTENT_TYPE_CHOICES,
        default=CT_MARKDOWN
        )
    published = models.DateTimeField(default=timezone.now)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # This allows us to create Comment instances programmatically (e.g. in tests)
    def save(self, *args, **kwargs):
        # When the object is instantiated, set the id field using the post URL and uuid
        if not self.id and self.post:
            self.id = self.post.id + "/comments/" + str(self.uuid)

            # When the object is created, increment the post's comment count
            self.post.count += 1
            self.post.save()
            
        super().save(*args, **kwargs)
