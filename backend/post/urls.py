from django.urls import path
from .views import PostList, PostDetail

urlpatterns = [
    path('', PostList.as_view()),
    path('<uuid:pk>/', PostDetail.as_view()),
]