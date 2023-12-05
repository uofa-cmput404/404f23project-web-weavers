from rest_framework import status
from rest_framework.response import Response
from authors.models import Author
from authors.serializers import AuthorSerializer
from post.models import Post
from post.serializers import PostSerializer
from requests.auth import HTTPBasicAuth
import requests

def get_remote_author(remote_author_url):
    if remote_author_url.startswith("https://c404-5f70eb0b3255.herokuapp.com"):
        headers = {'Authorization': 'Bearer 06c591151b14e0462efd2ad9c91888a530967c7f'} 
    elif remote_author_url.startswith("https://beeg-yoshi-backend-858f363fca5e.herokuapp.com"):
        headers = {'Authorization': 'Token bcad92d727cc40cd0435370dd285f9b82626890b'}
    elif remote_author_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
        remote_author = requests.get(remote_author_url, auth=HTTPBasicAuth('WebWeavers', '12345')).json()
    else:
        headers = {}

    # For teams using Django, it will be necessary to add a trailing slash to the URL
    if not remote_author_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
        if remote_author_url.endswith("/"):
            remote_author = requests.get(remote_author_url, headers).json()
            remote_author_url = remote_author_url[:-1]
        else:
            remote_author = requests.get(remote_author_url + "/", headers).json()

    # if the author does not exist, create it
    if not Author.objects.filter(displayName=remote_author["displayName"], host=remote_author["host"]).exists():
        author_serializer = AuthorSerializer(data=remote_author)
        if author_serializer.is_valid():
            # if the author's id is not a URL, then it is a ID
            if not remote_author["id"].startswith("http"):
                author_serializer.validated_data["uuid"] = remote_author["id"]
            else:
                # extract uuid from the URL
                author_serializer.validated_data["uuid"] = remote_author["id"].split("/")[-1]

            author_serializer.validated_data["id"] = remote_author_url
            author_serializer.validated_data["url"] = remote_author_url
            author_serializer.validated_data["host"] = remote_author["host"]
            return author_serializer.save()
        else:
            return Response(author_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Author.objects.get(displayName=remote_author["displayName"], host=remote_author["host"])

def get_remote_post(remote_post_url):
    if remote_post_url.startswith("https://c404-5f70eb0b3255.herokuapp.com"):
        headers = {'Authorization': 'Bearer 06c591151b14e0462efd2ad9c91888a530967c7f'} 
    elif remote_post_url.startswith("https://beeg-yoshi-backend-858f363fca5e.herokuapp.com"):
        headers = {'Authorization': 'Token bcad92d727cc40cd0435370dd285f9b82626890b'}
    elif remote_post_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
        remote_post = requests.get(remote_post_url, auth=HTTPBasicAuth('WebWeavers', '12345')).json()
    else:
        headers = {}

    # For teams using Django, it will be necessary to add a trailing slash to the URL
    if not remote_post_url.startswith("https://packet-pirates-backend-d3f5451fdee4.herokuapp.com"):
        if remote_post_url.endswith("/"):
            remote_post = requests.get(remote_post_url, headers).json()
            remote_post_url = remote_post_url[:-1]
        else:
            remote_post = requests.get(remote_post_url + "/", headers).json()

    # if the post does not exist, create it
    if not Post.objects.filter(id=remote_post["id"]).exists():
        post_serializer = PostSerializer(data=remote_post)
        if post_serializer.is_valid():

            remote_author = get_remote_author(remote_post["author"]["url"])

            # if an issue occurred while getting the remote author, return the error
            if isinstance(remote_author, Response):
                return remote_author

            post_serializer.validated_data["id"] = remote_post["id"]
            post_serializer.validated_data["author"] = remote_author
            return post_serializer.save()
        else:
            return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Post.objects.get(id=remote_post["id"])
