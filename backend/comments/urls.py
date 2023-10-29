from django.urls import path
from .views import CommentList, CommentDetail

urlpatterns = [
    path('',CommentList.as_view()),
]