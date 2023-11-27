from rest_framework.test import APITestCase
from .models import Comment
from authors.models import Author
from post.models import Post

# Create your tests here.

class CommentTests(APITestCase):
    def setUp(self):
        self.author1 = Author.objects.create(displayName="author1")
        self.author2 = Author.objects.create(displayName="author2")
        self.post1 = Post.objects.create(title="post1", description="post1", author=self.author1)
        self.comment1 = Comment.objects.create(author=self.author2, post=self.post1, comment="comment1")
        self.comment2 = Comment.objects.create(author=self.author1, post=self.post1, comment="comment2")

    def test_get_comments(self):
        response = self.client.get(f"{self.author1.url}/posts/{self.post1.uuid}/comments/")
        # response = self.client.get(f"{self.post1.id}/comments/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 2)

    def test_post_comment(self):
        response = self.client.post(f"{self.author1.url}/posts/{self.post1.uuid}/comments/", data={ 
            "comment": "comment3",
        }, format="json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["comment"], "comment3")
        self.assertEqual(Comment.objects.count(), 3)

        self.post1.refresh_from_db()  # Refresh the post instance from the database
        self.assertEqual(self.post1.count, 3)

    def test_get_comment_pagination(self):
        Comment.objects.create(author=self.author1, post=self.post1, comment="comment3")
        Comment.objects.create(author=self.author1, post=self.post1, comment="comment4")
        Comment.objects.create(author=self.author1, post=self.post1, comment="comment5")
        response = self.client.get(f"{self.author1.url}/posts/{self.post1.uuid}/comments/?size=1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 1)
