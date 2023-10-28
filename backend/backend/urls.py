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
from django.urls import path, include
from likes.views import list_author_likes, list_post_likes, send_like

urlpatterns = [
    # Admin site
    path('admin/', admin.site.urls),

    # Authors app
    path('authors/', include('authors.urls')),
    # Followers app
    path('authors/<uuid:author_id>/followers/', include('followers.urls')),
    # Posts
    path('authors/<uuid:author_id>/posts/', include('post.urls')),
    # Post Likes
    path('authors/<uuid:author_id>/posts/<uuid:post_id>/likes/', list_post_likes),
    # Liked
    path('<uuid:author_id>/liked', list_author_likes),
    # Inbox
    path('<uuid:author_id>/inbox', send_like),
    
]
