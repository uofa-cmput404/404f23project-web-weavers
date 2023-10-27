from rest_framework.routers import SimpleRouter
from authors.views import AuthorViewSet
from auth.views import LoginViewSet, RegistrationViewSet, RefreshViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'login', LoginViewSet, basename='auth-login')
routes.register(r'register', RegistrationViewSet, basename='auth-register')
routes.register(r'refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', AuthorViewSet, basename='user')


urlpatterns = [
    *routes.urls
]