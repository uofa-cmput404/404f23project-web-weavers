from rest_framework.test import APITestCase
from .models import Author

# Create your tests here.
class AuthorTests(APITestCase):
    def setUp(self):
        self.author1 = Author.objects.create(displayName="author1")
        self.author2 = Author.objects.create(displayName="author2")
        self.author3 = Author.objects.create(displayName="author3")
        self.client.force_authenticate(user=self.author1)
    
    def test_list_authors(self):
        response = self.client.get("/authors/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 3)
    
    def test_pagination(self):
        response = self.client.get("/authors/?page=2&size=1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["items"]), 1)
        self.assertEqual(response.data["items"][0]["displayName"], "author2")

    def test_get_author(self):
        response = self.client.get(f"/authors/{self.author1.uuid}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["displayName"], "author1")

    def test_post_author(self):
        response = self.client.post(f"/authors/{self.author1.uuid}/", {
            "github": "http://www.github.com/author1",
        }, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["github"], "http://www.github.com/author1")
