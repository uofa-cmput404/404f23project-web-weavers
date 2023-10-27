from django.db import models
import uuid
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
from authors.models import Author

# Create your models here.

class Post(models.Model):
    CT_MARKDOWN = 'text/markdown'
    CT_PLAIN = 'text/plain'
    CT_HTML = 'text/html'
    CT_BASE64 = 'application/base64'
    CT_PNG = 'image/png;base64'
    CT_JPG = 'image/jpeg;base64'
    CONTENT_TYPE_CHOICES = [
        (CT_MARKDOWN, 'Markdown'),
        (CT_PLAIN, 'Plain Text'),
        (CT_HTML, 'HTML'),
        (CT_BASE64, 'Base64 Encoded'),
        (CT_PNG, 'PNG Image'),
        (CT_JPG, 'JPEG Image'),
    ]

    VISIBILITY_CHOICES = (
        ("PUBLIC","PUBLIC"),
        ("FRIENDS","FRIENDS")
    )
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=200, default="post")
    title = models.CharField(max_length=200)
    id = models.URLField(max_length=200, unique=True, editable=False) 
    source = models.URLField()
    origin = models.URLField()
    description = models.CharField(max_length=200)
    contentType = models.CharField(
        max_length=200,
        choices=CONTENT_TYPE_CHOICES,
        default=CT_MARKDOWN
        )
    content = models.TextField(default="")
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = ArrayField(models.CharField(), blank=True, default=list, null=True)
    count = models.PositiveIntegerField(default=0)         # TODO: update this field when a comment is added
    comments = ArrayField(models.JSONField(), blank=True, default=list, null=True)
    commentsSrc = models.JSONField(null=True, blank=True) # TODO: will be replaced by the Comment model when implemented
    published = models.DateTimeField(default=timezone.now)
    visibility = models.CharField(max_length=200, choices=VISIBILITY_CHOICES, default="PUBLIC")
    unlisted = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # When the object is instantiated, set the id field using the author's id (URL) and the uuid
        if not self.id:
            self.id = self.author.id + "posts/" + str(self.uuid)
            self.source = self.id
            self.origin = self.id
        super().save(*args, **kwargs)
