from django.urls import path
from . import views

urlpatterns = [
    path('authors/<author_id>/posts/<post_id>', views.post_list),
    path('authors/<author_id>/posts/', views.post_list),
    path('authors/posts/', views.post_list),
]