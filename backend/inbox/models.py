from django.db import models

class Inbox(models.Model):
    type = models.CharField(max_length=50, default="inbox")
    author = models.OneToOneField("authors.Author", on_delete=models.CASCADE)
    posts = models.ManyToManyField("post.Post", symmetrical=False, blank=True)
    follows = models.ManyToManyField("followers.Follow", symmetrical=False, blank=True)
    comments = models.ManyToManyField("comments.Comment", symmetrical=False, blank=True)
    likes = models.ManyToManyField("likes.Like", symmetrical=False, blank=True)
