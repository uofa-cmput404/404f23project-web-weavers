from django.db import models

# Create your models here.
class Follow(models.Model):
    type = models.CharField(max_length=50, default="Follow")
    summary = models.CharField(max_length=200)
    actor = models.ForeignKey("authors.Author", on_delete=models.CASCADE) # Person sending the Follow request
    object = models.JSONField() # Person receiving the Follow request
