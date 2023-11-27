from django.urls import path
from .views import CommentList
from likes.views import list_comment_likes

urlpatterns = [
    path('',CommentList.as_view()),
    path('<uuid:comment_id>/likes/', list_comment_likes),
]
