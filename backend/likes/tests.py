from rest_framework.test import APITestCase
from .models import Like
from authors.models import Author
from post.models import Post

# Create your tests here.
class LikeTests(APITestCase):
    def setUp(self):
        self.author1 = Author.objects.create(displayName="Mary")
        self.author2 = Author.objects.create(displayName="Bob")
        self.author3 = Author.objects.create(displayName="Alice")
        # Mary's post
        self.post1 = Post.objects.create(title="post1", description="content1", author=self.author1)
        # Bob likes Mary's post
        self.post_like1 = Like.objects.create(summary="Bob likes your post", author=self.author2, object=self.post1.id)
        # Alice likes Mary's post
        self.post_like2 = Like.objects.create(summary="Alice likes your post", author=self.author3, object=self.post1.id)
        self.client.force_authenticate(user=self.author1)

    # This test keeps failing and I don't know why
    def test_list_post_likes(self):
        response = self.client.get(f"{self.post1.id}/likes/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 2)
        self.assertEqual(response.data["items"][0]["summary"], "Bob likes your post")
        self.assertEqual(response.data["items"][1]["summary"], "Alice likes your post")

    def test_list_comment_likes(self):
        pass

    def test_list_author_likes(self):
        response = self.client.get(f"{self.author2.url}/liked/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 1)
        self.assertEqual(response.data["items"][0]["object"], self.post1.id)
