from django.db import models

# Create your models here.
class Follow(models.Model):
    type = models.CharField(max_length=50, default="Follow")
    summary = models.CharField(max_length=200)
    actor = models.ForeignKey("authors.Author", related_name='follow_requester', on_delete=models.CASCADE) # Person sending the Follow request
    object = models.ForeignKey("authors.Author", related_name='author_to_follow', on_delete=models.CASCADE) # Person receiving the Follow request
