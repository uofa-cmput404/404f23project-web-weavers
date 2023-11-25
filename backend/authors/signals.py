# Implementation derived from:
# https://stackoverflow.com/questions/44451771/django-create-and-save-many-instances-of-model-when-another-object-are-created

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Author
from inbox.models import Inbox

@receiver(post_save, sender=Author)
def create_inbox(sender, instance, created, **kwargs):
    if created:
        Inbox.objects.create(author=instance)
