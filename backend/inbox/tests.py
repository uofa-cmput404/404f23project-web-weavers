from rest_framework.test import APITestCase
from authors.models import Author
from post.models import Post
from likes.models import Like
from inbox.models import Inbox

# Create your tests here.
class InboxTests(APITestCase):
    def setUp(self):
        self.author1 = Author.objects.create(displayName="Alice")
        self.author2 = Author.objects.create(displayName="Bob")
        self.author3 = Author.objects.create(displayName="Mary")
        self.post1 = Post.objects.create(title="post1", description="content1", author=self.author1)
        self.post2 = Post.objects.create(title="post2", description="content2", author=self.author1)
        self.inbox = Inbox.objects.get(author=self.author1)
        self.client.force_authenticate(user=self.author1)

    def test_send_and_get_inbox_post(self):
        response1 = self.client.post(f"{self.author1.url}/inbox/", {
            "type": "post",
            "id": self.post1.id,
        })
        self.assertEqual(response1.status_code, 200)

        response2 = self.client.get(f"{self.author1.url}/inbox/")
        ### Check Response Data
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response2.data["author"], self.author1.id)
        self.assertEqual(response2.data["type"], "inbox")
        self.assertEqual(len(response2.data["items"]), 1)
        self.assertEqual(response2.data["items"][0]["id"], self.post1.id)

        ### Check Inbox Data
        self.assertEqual(len(self.inbox.posts.all()), 1)

    def test_get_paginated_inbox(self):
        self.client.post(f"{self.author1.url}/inbox/", {
            "type": "post",
            "id": self.post1.id,
        })
        self.client.post(f"{self.author1.url}/inbox/", {
            "type": "post",
            "id": self.post2.id,
        })
        response = self.client.get(f"{self.author1.url}/inbox/?page=2&size=1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["author"], self.author1.id)
        self.assertEqual(len(response.data["items"]), 1)
        # post 2 will be the first item in the inbox because 
        # we sort posts by reverse chronological order
        self.assertEqual(response.data["items"][0]["id"], self.post1.id)

    def test_send_and_get_inbox_like(self):
        response1 = self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Bob likes your post",
            "type": "Like",
            "author": self.author2.id,
            "object": self.post1.id,
        })
        self.assertEqual(response1.status_code, 200)

        response2 = self.client.get(f"{self.author1.url}/inbox/likes/")
        ### Check Response Data
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response2.data["author"], self.author1.id)
        self.assertEqual(response2.data["type"], "inbox")
        self.assertEqual(len(response2.data["items"]), 1)
        self.assertEqual(response2.data["items"][0]["author"]["id"], self.author2.id)
        self.assertEqual(response2.data["items"][0]["object"], self.post1.id)

        ### Check Inbox Data
        self.assertEqual(len(self.inbox.likes.all()), 1)

    def test_send_and_get_inbox_follow(self):
        response1 = self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Bob follows Alice",
            "type": "Follow",
            "actor": self.author2.id,
            "object": self.author1.id,
        })
        self.assertEqual(response1.status_code, 200)

        response2 = self.client.get(f"{self.author1.url}/inbox/follows/")
        ### Check Response Data
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response2.data["author"], self.author1.id)
        self.assertEqual(response2.data["type"], "inbox")
        self.assertEqual(len(response2.data["items"]), 1)
        self.assertEqual(response2.data["items"][0]["actor"]["id"], self.author2.id)
        self.assertEqual(response2.data["items"][0]["object"]["id"], self.author1.id)

        ### Check Inbox Data
        self.assertEqual(len(self.inbox.follows.all()), 1)

    def test_delete_inbox(self):
        # send a post to the inbox
        self.client.post(f"{self.author1.url}/inbox/", {
            "type": "post",
            "id": self.post1.id,
        })

        # send a like to the inbox
        self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Bob likes your post",
            "type": "Like",
            "author": self.author2.id,
            "object": self.post1.id,
        })

        # send a follow to the inbox
        self.client.post(f"{self.author1.url}/inbox/", {
            "summary": "Bob follows Alice",
            "type": "Follow",
            "actor": self.author2.id,
            "object": self.author1.id,
        })
        response = self.client.delete(f"{self.author1.url}/inbox/")

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(self.inbox.posts.all()), 0)
        self.assertEqual(len(self.inbox.likes.all()), 0)
        self.assertEqual(len(self.inbox.follows.all()), 0)

