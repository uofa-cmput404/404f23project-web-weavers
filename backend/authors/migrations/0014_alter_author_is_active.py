# Generated by Django 4.2.7 on 2023-12-08 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0013_alter_author_profileimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]