from rest_framework.test import APITestCase
from .models import Post
from authors.models import Author
import uuid

class PostTests(APITestCase):
    def setUp(self):
        self.author1 = Author.objects.create(displayName="author1")
        self.post1 = Post.objects.create(title="post1", description="content1", author=self.author1)
        self.post2 = Post.objects.create(title="post2", description="content2", author=self.author1)
        self.post3 = Post.objects.create(title="post3", description="content3", author=self.author1)
        self.client.force_authenticate(user=self.author1)

    # This is the POST to /posts/ endpoint
    def test_post_posts(self):
        response = self.client.post(f"{self.author1.url}/posts/", {
            "title": "post99",
            "description": "content99",
        }, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["title"], "post99")
        self.assertEqual(response.data["description"], "content99")
        self.assertEqual(Post.objects.count(), 4)

    def test_list_posts(self):
        response = self.client.get(f"{self.author1.url}/posts/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 3)

    def test_list_posts_pagination(self):
        response = self.client.get(f"{self.author1.url}/posts/?size=1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 1)
        self.assertEqual(response.data["items"][0]["title"], "post3") # the latest post should be first

    def test_get_post(self):
        response = self.client.get(f"{self.author1.url}/posts/{self.post1.uuid}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "post1")
        self.assertEqual(response.data["description"], "content1")

    def test_update_post(self):
        response = self.client.post(f"{self.author1.url}/posts/{self.post1.uuid}/", {
            "title": "post1",
            "description": "new description"
        }, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "post1")
        self.assertEqual(response.data["description"], "new description")

    def test_delete_post(self):
        response = self.client.delete(f"{self.author1.url}/posts/{self.post1.uuid}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Post.objects.count(), 2)

    def test_create_post_with_given_id(self):
        post_id = uuid.uuid4()
        response = self.client.put(f"{self.author1.url}/posts/{post_id}/", {
            "title": "New and improved post",
            "description": "New and improved content",
        }, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Post.objects.count(), 4)
        self.assertEqual(Post.objects.get(pk=post_id).title, "New and improved post")
        self.assertEqual(Post.objects.get(pk=post_id).description, "New and improved content")

    def test_create_post_with_existing_id(self):
        response = self.client.put(f"{self.author1.url}/posts/{self.post1.uuid}/", {
            "title": "New and improved post",
            "description": "New and improved content",
        }, format="json")
        self.assertEqual(response.status_code, 409)
        # We are checking the post did not get created and did not overwrite the existing post
        self.assertEqual(Post.objects.count(), 3)
        self.assertNotEqual(Post.objects.get(pk=self.post1.uuid).title, "New and improved post")
        self.assertNotEqual(Post.objects.get(pk=self.post1.uuid).description, "New and improved content")

    def test_get_nonexistent_post(self):
        response = self.client.get(f"{self.author1.url}/posts/99999999/")
        self.assertEqual(response.status_code, 404)

    def test_update_nonexistent_post(self):
        response = self.client.post(f"{self.author1.url}/posts/99999999/", {
            "title": "post1",
            "description": "new description"
        }, format="json")
        self.assertEqual(response.status_code, 404)

    def test_delete_nonexistent_post(self):
        response = self.client.delete(f"{self.author1.url}/posts/99999999/")
        self.assertEqual(response.status_code, 404)

    def test_list_public_posts(self):
        response = self.client.get("/public-posts/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 3)
        self.assertEqual(response.data["items"][0]["title"], "post3")
