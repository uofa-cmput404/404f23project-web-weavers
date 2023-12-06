# Generated by Django 4.2.7 on 2023-12-06 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_alter_post_comments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='visibility',
            field=models.CharField(choices=[('PUBLIC', 'PUBLIC'), ('PRIVATE', 'PRIVATE'), ('FRIENDS', 'FRIENDS')], default='PUBLIC', max_length=200),
        ),
    ]