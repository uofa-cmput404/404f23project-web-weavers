from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Post

class PostTests(TestCase):
    def setUp(self):
        # Create some test data
        self.post = Post.objects.create(title="Test Post", content="Test content")

    def test_get_post_list(self):
        client = APIClient()
        #need to change this to the actual endpoint
        response = client.get('')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['type'], 'posts')

    def test_get_post_detail(self):
        client = APIClient()
        response = client.get(f'/your-api-endpoint/{self.post.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.post.title)

    def test_create_post(self):
        client = APIClient()
        data = {'title': 'New Post', 'content': 'New content'}
        response = client.post('/your-api-endpoint/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)  # Check that a new post was created

    def test_update_post(self):
        client = APIClient()
        data = {'title': 'Updated Post', 'content': 'Updated content'}
        response = client.put(f'/your-api-endpoint/{self.post.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.get(id=self.post.id).title, 'Updated Post')

    def test_delete_post(self):
        client = APIClient()
        response = client.delete(f'/your-api-endpoint/{self.post.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(), 0)


# Create your tests here.
