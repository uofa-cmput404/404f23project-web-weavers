from django.urls import path
from .views import CommentList

urlpatterns = [
    path('',CommentList.as_view()),
]
