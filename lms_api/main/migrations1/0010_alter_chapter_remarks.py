# Generated by Django 4.2.2 on 2023-07-19 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_chapter_remarks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='remarks',
            field=models.TextField(max_length=100),
        ),
    ]
