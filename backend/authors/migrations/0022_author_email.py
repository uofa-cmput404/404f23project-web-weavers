# Generated by Django 4.2.6 on 2023-10-27 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0021_author_id_alter_author_uuid'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='email',
            field=models.EmailField(blank=True, max_length=100),
        ),
    ]
