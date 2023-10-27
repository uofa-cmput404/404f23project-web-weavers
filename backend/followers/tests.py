from rest_framework.test import APITestCase
from authors.models import Author

# Create your tests here.
class FollowersTests(APITestCase):
    def setUp(self):
        self.author1 = Author.objects.create(displayName="author1")
        self.author2 = Author.objects.create(displayName="author2")
        self.author3 = Author.objects.create(displayName="author3")
        self.author1.followers.add(self.author2)
        self.author1.followers.add(self.author3)

    def test_list_followers(self):
        response = self.client.get(f"{self.author1.id}/followers/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 2)

    def test_get_empty_list_followers(self):
        response = self.client.get(f"{self.author3.id}/followers/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 0)

    def test_get_follower(self):
        response = self.client.get(f"{self.author1.id}/followers/{self.author2.uuid}/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["is_follower"])
    
    def test_get_non_follower(self):
        response = self.client.get(f"{self.author3.id}/followers/{self.author2.uuid}/")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.data["is_follower"])

    def test_put_follower(self):
        response = self.client.put(f"{self.author3.id}/followers/{self.author2.uuid}/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.author3.followers.filter(pk=self.author2.uuid).exists())

    def test_delete_follower(self):
        response = self.client.delete(f"{self.author1.id}/followers/{self.author2.uuid}/")
        self.assertEqual(response.status_code, 204)
        self.assertFalse(self.author1.followers.filter(pk=self.author2.uuid).exists())

    def test_delete_non_follower(self):
        response = self.client.delete(f"{self.author1.id}/followers/{self.author1.uuid}/")
        self.assertEqual(response.status_code, 404)
        self.assertFalse(self.author1.followers.filter(pk=self.author1.uuid).exists())

