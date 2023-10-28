from django.db import models

# Create your models here.
class Like(models.Model):
    context = models.CharField(max_length=200, default="https://www.w3.org/ns/activitystreams", name="@context")
    summary = models.CharField(max_length=200)
    type = models.CharField(max_length=50, default="Like")
    author = models.ForeignKey("authors.Author", on_delete=models.CASCADE)
    object = models.URLField(max_length=200)

