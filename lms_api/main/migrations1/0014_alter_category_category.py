# Generated by Django 4.2.2 on 2023-07-27 10:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_student_email_studentcourseenrollment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.coursecategory'),
        ),
    ]
