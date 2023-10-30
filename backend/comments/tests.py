from django.test import TestCase
from .models import Comment
from authors.models import Author
from post.models import Post

# Create your tests here.

def setUp(self):
    self.author1 = Author.objects.create(displayName="author1")
    self.author2 = Author.objects.create(displayName="author2")
    self.post1 = Post.objects.create(title="post1", description="post1", author=self.author1)
    self.comment1 = Comment.objects.create(author=self.author1, post=self.post1, comment="comment1")
    self.comment2 = Comment.objects.create(author=self.author2, post=self.post1, comment="comment2")

