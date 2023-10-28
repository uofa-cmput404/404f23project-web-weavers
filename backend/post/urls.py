from django.urls import path
from .views import PostList, PostDetails

urlpatterns = [
    path('', PostList.as_view()),
    path('<uuid:post_id>/', PostDetails.as_view()),
]
