# Generated by Django 4.2.6 on 2023-10-26 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0013_author_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='url',
            field=models.URLField(editable=False),
        ),
    ]
