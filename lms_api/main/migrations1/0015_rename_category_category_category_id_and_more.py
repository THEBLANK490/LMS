# Generated by Django 4.2.2 on 2023-07-27 10:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_alter_category_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='category',
            new_name='category_id',
        ),
        migrations.RenameField(
            model_name='category',
            old_name='teacher',
            new_name='teacher_id',
        ),
    ]
