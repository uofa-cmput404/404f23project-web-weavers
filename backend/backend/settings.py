"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
from pathlib import Path
import django_on_heroku
import dj_database_url
import dotenv
import os
from datetime import timedelta 

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-gn+4vkfh)lu+ur=%vzveu_a@9t!&&y_gky*mh^b*apgmbe%#fp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'drf_spectacular',
    'authors',
    'post',
    'followers',
    'comments',
    'likes',
    'nodes',
    'inbox',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # used for serving static files on heroku
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# Get the environment variables from the .env file
dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)

# dj_database_url dynamically generate the dictionary from the DATABASE_URL environment variable
# Locally, the DATABASE_URL environment variable is set in the .env file
# On Heroku, the DATABASE_URL environment variable is set automatically
DATABASES = {
    'default': dj_database_url.config(
        conn_max_age=600,
        conn_health_checks=True,
    ),
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Edmonton'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') # Django static files (Django admin page, etc.)

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Social Distribution',
    'DESCRIPTION': 'Implementation by the Web Weavers',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    # OTHER SETTINGS
}

AUTH_USER_MODEL = 'authors.Author'
SIMPLE_JWT = {
    'USER_ID_FIELD': 'uuid',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
}

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000", "http://127.0.0.1:8000", "http://localhost:3000", "http://localhost:8000",
    "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com", "https://packet-pirates-frontend-46271456b73c.herokuapp.com",
    "https://c404-5f70eb0b3255.herokuapp.com", "https://web-weavers-734f03.netlify.app",
    "https://frontend-beeg-yoshi.onrender.com", "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com"
]

CSRF_TRUSTED_ORIGINS= [
    "http://127.0.0.1:3000", "http://127.0.0.1:8000", "http://localhost:3000", "http://localhost:8000",
    "http://127.0.0.1:3000/", "http://127.0.0.1:8000/", "http://localhost:3000/", "http://localhost:8000/",
    "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com", "https://packet-pirates-frontend-46271456b73c.herokuapp.com",
    "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/", "https://packet-pirates-frontend-46271456b73c.herokuapp.com/",
    "https://c404-5f70eb0b3255.herokuapp.com", "https://web-weavers-734f03.netlify.app",
    "https://c404-5f70eb0b3255.herokuapp.com/", "https://web-weavers-734f03.netlify.app/",
    "https://frontend-beeg-yoshi.onrender.com", "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com"
    "https://frontend-beeg-yoshi.onrender.com/", "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"
]
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_ALL_ORIGINS = True

django_on_heroku.settings(locals())


# disable ssl for local development
options = DATABASES['default'].get('OPTIONS', {})
options.pop('sslmode', None)
