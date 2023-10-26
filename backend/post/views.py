from django.shortcuts import render, get_object_or_404
from django.forms.models import model_to_dict
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from authors.models import Author
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination

# Create your views here.

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def post_list(request, author_id=None, post_id=None):
    """
    List all posts, or create a new post.
    """
    if request.method == 'GET':
        paginator = PageNumberPagination()
        paginator.page_size = 10
        
        if author_id is not None:
            if post_id is not None:
                author = Author.objects.get(id=author_id)
                post = Post.objects.get(id=post_id, author=author, visibility="PUBLIC")
                serializer = PostSerializer(post)
                serial_data = serializer.data
                serial_data["id"] = url + f'/author/{post.author_id}/posts/{post_id}'
                serial_data["author"] = {
                    "type": post.author.type,
                    "id": f'{url}/author/{post.author_id}',
                    "host": post.author.host,
                    "displayName": post.author.displayName,
                    "url": post.author.url,
                    "github": f'http://github.com/{post.author.githubName}',
                    "profileImage": post.author.profileImage
                        }
                return Response(serial_data, status = status.HTTP_200_OK)
            elif post_id is None:
                author = Author.objects.get(id=author_id)
                posts = Post.objects.filter(author=author, visibility="PUBLIC")
                results = paginator.paginate_queryset(posts, request)
                serializer = PostSerializer(results, many=True)
                data = serializer.data

                for entry in data:
                    entry["id"] = url + f'/author/{author_id}/posts/{entry["id"]}'
                    entry["author"] = {
                        "type": author.type,
                        "id": f'{url}/author/{author_id}',
                        "host": author.host,
                        "displayName": author.displayName,
                        "url": author.url,
                        "github": f'http://github.com/{author.githubName}',
                        "profileImage": author.profileImage
                            }
                    
                return Response(data, status = status.HTTP_200_OK)
        
        elif author_id is None:
            post_obj = Post.objects.filter(visibility="PUBLIC")
            results = paginator.paginate_queryset(post_obj, request)
            serializer = PostSerializer(results, many=True)
            data = serializer.data

            for entry in data:
                author = Author.objects.get(id=entry["author"])
                entry["id"] = url + f'/author/{entry["author"]}/posts/{entry["id"]}'
                entry["author"] = {
                    "type": author.type,
                    "id": f'{url}/author/{entry["author"]}',
                    "host": author.host,
                    "displayName": author.displayName,
                    "url": author.url,
                    "github": f'http://github.com/{author.githubName}',
                    "profileImage": author.profileImage
                        }
                
            return Response(data, status = status.HTTP_200_OK)
                
    elif request.method == 'POST':
        if post_id is not None:
            author = Author.objects.get(id=author_id)
            post = Post.objects.get(id=post_id, author=author)
            post_data = request.data

            post.title = post_data["title"]
            post.description = post_data["description"]
            post.contentType = post_data["contentType"]
            post.content = post_data["content"]
            post.categories = post_data["categories"]
            post.visibility = post_data["visibility"]

            post.save(update_fields=["title", "description", "contentType", "content", "categories", "visibility"])

            data = model_to_dict(post)
            data["published"] = str(data["published"])
            data["id"] = url + f'/author/{author_id}/posts/{post_id}'
            data["author"] = {
                "type": author.type,
                "id": str(author.id),
                "host": author.host,
                "displayName": author.displayName,
                "url": author.url,
                "github": f'http://github.com/{author.githubName}',
                "profileImage": author.profileImage
                    }
            return Response(data, status = status.HTTP_200_OK)
        
        elif post_id is None:
            author = Author.objects.get(id=author_id)
            post_data = request.data
            post_data.update({"author": author.id})
            serializer = PostSerializer(data=post_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            data = serializer.data
            data["published"] = str(data["published"])
            data["id"] = url + f'/author/{author_id}/posts/{data["id"]}'
            data["author"] = {
                "type": author.type,
                "id": str(author.id),
                "host": author.host,
                "displayName": author.displayName,
                "url": author.url,
                "github": f'http://github.com/{author.githubName}',
                "profileImage": author.profileImage
                    }
            return Response(data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if post_id is not None:
            author = Author.objects.get(id=author_id)
            post_data = request.data
            post_data.update({"author": author.id, "id": post_id})
            serializer = PostSerializer(data=post_data)
            serializer.is_valid(raise_exception=True)
            serializer.save(id=post_id)

            data = serializer.data
            data["published"] = str(data["published"])
            data["id"] = url + f'/author/{author_id}/posts/{post_id}'
            data["author"] = {
                "type": author.type,
                "id": str(author.id),
                "host": author.host,
                "displayName": author.displayName,
                "url": author.url,
                "github": f'http://github.com/{author.githubName}',
                "profileImage": author.profileImage
                    }
            return Response(data, status = status.HTTP_200_OK)
        elif post_id is None:
            data = {'error': 'PUT request requires a post_id'}
            return Response(data, status = status.HTTP_405_METHOD_NOT_ALLOWED)

    elif request.method == 'DELETE':
        if post_id is not None:
            author = Author.objects.get(id=author_id)
            post = Post.objects.get(id=post_id, author=author)
            serializer = PostSerializer(post)
            post.delete()
            data = {"message" : "Deletion Successful"}
            return Response(data, status = status.HTTP_202_ACCEPTED)
        elif post_id is None:
            data = {'error': 'DELETE request requires a post_id'}
            return Response(data, status = status.HTTP_405_METHOD_NOT_ALLOWED)  

