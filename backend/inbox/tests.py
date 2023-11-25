from rest_framework.test import APITestCase
from authors.models import Author
from post.models import Post
from likes.models import Like

# Create your tests here.
class InboxTests(APITestCase):
    def setUp(self):
        self.author1 = Author.objects.create(displayName="Alice")
        self.author2 = Author.objects.create(displayName="Bob")
        self.author3 = Author.objects.create(displayName="Mary")
        self.post1 = Post.objects.create(title="post1", description="content1", author=self.author1)
        self.client.force_authenticate(user=self.author1)

    def test_get_inbox(self):
        response1 = self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Bob likes your post",
            "type": "Like",
            "author": self.author2.uuid,
            "object": self.post1.id,
        })
        self.assertEqual(response1.status_code, 200)

        response2 = self.client.get(f"{self.author1.url}/inbox/")
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response2.data["author"], self.author1.id)
        self.assertEqual(response2.data["type"], "inbox")
        self.assertEqual(len(response2.data["items"]), 1)

    def test_get_inbox_with_page(self):
        self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Bob likes your post",
            "type": "Like",
            "author": self.author2.uuid,
            "object": self.post1.id,
        })
        self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Mary likes your post",
            "type": "Like",
            "author": self.author3.uuid,
            "object": self.post1.id,
        })

        response = self.client.get(f"{self.author1.url}/inbox/?page=2&size=1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["author"], self.author1.url)
        self.assertEqual(response.data["type"], "inbox")
        self.assertEqual(len(response.data["items"]), 1)
        self.assertEqual(response.data["items"][0]["author"], str(self.author3.uuid))

    def test_post_inbox(self):
        response = self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Bob likes your post",
            "type": "Like",
            "author": self.author2.uuid,
            "object": self.post1.id,
        })

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Like.objects.count(), 1)

    def test_delete_inbox(self):
        response = self.client.delete(f"{self.author1.url}/inbox/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(self.author1.inbox), 0)

