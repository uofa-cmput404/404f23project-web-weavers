# Generated by Django 4.2.6 on 2023-10-26 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0008_remove_author_displayname'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='displayName',
            field=models.CharField(default='displayName', max_length=100),
        ),
    ]