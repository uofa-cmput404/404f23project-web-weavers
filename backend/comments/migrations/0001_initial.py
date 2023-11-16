# Generated by Django 4.2.6 on 2023-11-02 20:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0002_alter_post_author_alter_post_origin_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('type', models.CharField(blank=True, default='comment', max_length=300)),
                ('comment', models.TextField()),
                ('contentType', models.CharField(choices=[('text/markdown', 'Markdown'), ('text/plain', 'Plain Text')], default='text/markdown', max_length=200)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.post')),
            ],
        ),
    ]