# Generated by Django 4.2.6 on 2023-11-24 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0009_remove_author_inbox'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='host',
            field=models.URLField(),
        ),
    ]