from django.urls import path
from .views import AuthorList, AuthorDetails

urlpatterns = [
    path('', AuthorList.as_view()),
    path('<uuid:pk>/', AuthorDetails.as_view()),
]
