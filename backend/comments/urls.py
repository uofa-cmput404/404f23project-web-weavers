from django.urls import path
from .views import CommentList, CommentDetail

urlpatterns = [
    path('',CommentList.as_view()),
    path('<uuid:comment_id>/',CommentDetail.as_view()),
]