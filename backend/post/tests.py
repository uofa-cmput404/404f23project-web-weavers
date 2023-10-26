from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Post
from authors.models import Author

# Create your tests here.

class PostTestCase(APITestCase):
    def setUp(self):
        self.username = 'testuser'
        self.email = 'test@gmai.com'
        self.displayName = 'testDisplayName'
        self.password = 'testpass'
        self.githubName = 'testgithub'
        self.user_info = {'username': self.username, 'email': self.email, 'displayName': self.displayName, 'password': self.password, 'githubName': self.githubName}
        self.login_info = {'username': self.username, 'password': self.password}
        self.client = APIClient()

    def test_create_post(self):
        # creating a post
        author = Author.objects.get(username = "testuser")
        author_id = str(author.id)
        url = f'/authors/'+author_id+'/posts/'

        self.test_post_data = {
            "title": "test title",
            "description": "test description",
            "contentType": "text/markdown",
            "categories": ["testcategory"],
            "visibility": "PUBLIC",
            "unlisted": "false"
        }
        self.response=self.client.post(url,self.test_post_conetent,format="json")
        self.assertEqual(self.response.status_code,201)

    def test_get_author_posts(self):
        # getting all posts of an author
        author = Author.objects.get(username = "testuser")
        author_id = str(author.id)
        url = f'/authors/'+author_id+'/posts/'

        self.response=self.client.get(url, format="json")
        self.assertEqual(self.response.status_code,200)

    def test_get_single_post(self):
        # getiing a single post of an author
        author = Author.objects.get(username = "testuser")
        author_id = str(author.id)
        Post.objects.create(
            id = "98189-bjogi-1234",
            author = author,
            title = "test title",
            description = "test description",
            contentType = "text/markdown",
            content = "test content",
            categories = ["testcategory"],
            visibility = "PUBLIC",
            unlisted = False
        )
        response = self.client.get(f'/authors/' + author_id + '/posts/98189-bjogi-1234')
        self.assertEqual(response.status_code, 200)

    def test_put_post(self):
        # creating a new post
        author = Author.objects.get(username = "testuser")
        author_id = str(author.id)
        self.PutContent = {
            "title": "test put title",
            "description": "test put description",
            "contentType": "text/markdown",
            "content": "test put content",
            "categories": ["testputcategory"],
            "visibility": "PUBLIC"
        }
        response = self.client.put(f'/authors/' + author_id + '/posts/98189-bjogi-123456',self.PutContent,format="json")
        self.assertEqual(response.status_code, 201)

    def test_update_post(self):
        # updating a post
        author = Author.objects.get(username = "testuser")
        author_id = str(author.id)
        Post.objects.create(
            id = "98189-bjogi-1234",
            author = author,
            title = "test title",
            description = "test description",
            contentType = "text/markdown",
            content = "test content",
            categories = ["testcategory"],
            visibility = "PUBLIC",
            unlisted = False
        )
        self.UpdateContent = ({
            "title": "new test title",
            "description": "new test description",
            "contentType": "text/plain",
            "content": "new test content",
            "categories": ["testcategory2"],
            "visibility": "PUBLIC",
            "unlisted": "false"
        })
        response = self.client.post(f'/authors/' + author_id + '/posts/98189-bjogi-1234',self.UpdateContent,format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["title"], "new test title")

    def test_delete_post(self):
        author = Author.objects.get(username = "testuser")
        author_id = str(author.id)
        Post.objects.create(
            id = "98189-bjogi-1234",
            author = author,
            title = "test title",
            description = "test description",
            contentType = "text/markdown",
            content = "test content",
            categories = ["testcategory"],
            visibility = "PUBLIC",
            unlisted = False
        )
        response = self.client.delete(f'/authors/' + author_id + '/posts/98189-bjogi-1234')
        self.assertEqual(response.status_code, 202)
