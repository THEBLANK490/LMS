# Generated by Django 4.2.2 on 2023-08-30 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_rename_student_studentfavoritecourse_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='student_profile_img',
            field=models.ImageField(blank=True, null=True, upload_to='teacher_profile_imgs/'),
        ),
    ]
