# Generated by Django 4.2.6 on 2023-10-14 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0002_alter_author_id_alter_author_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='host',
            field=models.URLField(default='http://127.0.0.1:8000/'),
        ),
    ]
