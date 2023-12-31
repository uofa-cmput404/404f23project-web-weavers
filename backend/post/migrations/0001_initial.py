# Generated by Django 4.2.6 on 2023-10-27 22:09

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authors', '0004_rename_display_name_author_displayname_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(default='post', max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('id', models.URLField(editable=False, unique=True)),
                ('source', models.URLField()),
                ('origin', models.URLField()),
                ('description', models.CharField(max_length=200)),
                ('contentType', models.CharField(choices=[('text/markdown', 'Markdown'), ('text/plain', 'Plain Text'), ('text/html', 'HTML'), ('application/base64', 'Base64 Encoded'), ('image/png;base64', 'PNG Image'), ('image/jpeg;base64', 'JPEG Image')], default='text/markdown', max_length=200)),
                ('content', models.TextField(default='')),
                ('categories', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(), blank=True, default=list, null=True, size=None)),
                ('count', models.PositiveIntegerField(default=0)),
                ('comments', django.contrib.postgres.fields.ArrayField(base_field=models.JSONField(), blank=True, default=list, null=True, size=None)),
                ('commentsSrc', models.JSONField(blank=True, null=True)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('visibility', models.CharField(choices=[('PUBLIC', 'PUBLIC'), ('FRIENDS', 'FRIENDS')], default='PUBLIC', max_length=200)),
                ('unlisted', models.BooleanField(default=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authors.author')),
            ],
        ),
    ]
