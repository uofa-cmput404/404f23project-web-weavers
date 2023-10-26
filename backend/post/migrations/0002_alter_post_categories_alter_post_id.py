# Generated by Django 4.2.6 on 2023-10-26 01:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='categories',
            field=models.BinaryField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.URLField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
