from django.db import models

# Create your models here.
class Node(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    host = models.URLField(max_length=200) # The other team's endpoint
    team_name = models.CharField(max_length=200) # The other team's name
    # Because we filter by author for certain operations, we might have to store authors from other nodes
    # remote_authors = models.ManyToManyField('authors.Author', related_name='all_authors')

    def __str__(self):
        return self.team_name
