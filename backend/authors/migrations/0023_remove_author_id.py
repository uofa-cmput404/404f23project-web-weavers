# Generated by Django 4.2.6 on 2023-10-27 01:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0022_author_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='id',
        ),
    ]