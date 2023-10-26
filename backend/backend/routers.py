from rest_framework.routers import SimpleRouter
from authors.views import AuthorViewSet
from auth.views import LoginViewSet, RegistrationViewSet, RefreshViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', AuthorViewSet, basename='user')


urlpatterns = [
    *routes.urls
]