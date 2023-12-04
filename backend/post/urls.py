from django.urls import path
from .views import PostList, PostDetails, get_image

urlpatterns = [
    path('', PostList.as_view()),
    path('<uuid:post_id>/', PostDetails.as_view()),
    path('<uuid:post_id>/image/', get_image),
]
