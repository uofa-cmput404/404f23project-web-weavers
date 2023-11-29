from django.urls import path
from .views import FollowersList, FollowerDetails

urlpatterns = [
    path('', FollowersList.as_view()),
    path('<str:foreign_author_id>/', FollowerDetails.as_view()),
]
