# Generated by Django 4.2.6 on 2023-11-25 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0010_alter_author_host'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='host',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='author',
            name='password',
            field=models.CharField(blank=True, editable=False, max_length=100),
        ),
    ]
