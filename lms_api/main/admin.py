from django.contrib import admin
from . import models

# Register your models here.
# class TeacherCourseCategory(admin.ModelAdmin):
#     list_display = ['title','description']

admin.site.register(models.Teacher)
admin.site.register(models.Student)
admin.site.register(models.Category)
admin.site.register(models.Chapter)
admin.site.register(models.CourseCategory)
admin.site.register(models.StudentCourseEnrollment)
