# Generated by Django 4.2.6 on 2023-10-26 10:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0007_author_groups_author_is_active_author_is_staff_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='displayName',
        ),
    ]
