"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from post.views import list_public_posts
from likes.views import list_author_likes, list_post_likes
from inbox.views import InboxView, list_likes_from_inbox, list_follows_from_inbox
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),
    # Auth
    path('auth/', include(('backend.routers', 'backend'), namespace='backend')),
    # Authors app
    path('authors/', include('authors.urls')),
    # Followers app
    path('authors/<uuid:author_id>/followers/', include('followers.urls')),
    # Posts
    path('public-posts/', list_public_posts),
    path('authors/<uuid:author_id>/posts/', include('post.urls')),
    # Post Likes
    path('authors/<uuid:author_id>/posts/<uuid:post_id>/likes/', list_post_likes),
    # Liked
    path('authors/<uuid:author_id>/liked/', list_author_likes),
    # Inbox
    path('authors/<uuid:author_id>/inbox/', InboxView.as_view()),
    path('authors/<uuid:author_id>/inbox/follows/', list_follows_from_inbox),
    path('authors/<uuid:author_id>/inbox/likes/', list_likes_from_inbox),
    # path('authors/<uuid:author_id>/inbox/comments/', InboxView.as_view()), #TODO: implement after Comments is done

    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
