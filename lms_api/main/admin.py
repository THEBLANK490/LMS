from django.contrib import admin
from . import models

# Register your models here.
# class TeacherCourseCategory(admin.ModelAdmin):
#     list_display = ['title','description']
class TeacherAdmin(admin.ModelAdmin):
    list_display = ["full_name","detail",'email','password','qualification','mobile_no','profile_img','skills']
    search_fields = ["full_name",'email']
    list_filter = ["full_name"]

class StudentAdmin(admin.ModelAdmin):
    list_display = ["full_name",'email','password','username','interested_categories','student_profile_img']
    search_fields = ["full_name",'email']
    list_filter = ["full_name"]

class CategoryAdmin(admin.ModelAdmin):
    list_display = ["category",'teacher','title','description','featured_img','languages']
    search_fields = ["category"]

class ChapterAdmin(admin.ModelAdmin):
    list_display = ["course",'title','description','video','remarks','material']
    search_fields = ["title"]

class ChapterAdmin(admin.ModelAdmin):
    list_display = ["course",'title','description','video','remarks','material']
    search_fields = ["title"]

class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ['title','description']
    search_fields = ["title"]

class StudentCourseEnrollmentAdmin(admin.ModelAdmin):
    list_display = ['course','student','enrolled_time']
    search_fields = ["course"]

class StudentFavoriteCourseAdmin(admin.ModelAdmin):
    list_display = ['course','student','status']
    search_fields = ["course"]



admin.site.register(models.Teacher,TeacherAdmin)
admin.site.register(models.Student,StudentAdmin)
admin.site.register(models.Category,CategoryAdmin)
admin.site.register(models.Chapter,ChapterAdmin)
admin.site.register(models.CourseCategory,CourseCategoryAdmin)
admin.site.register(models.StudentCourseEnrollment,StudentCourseEnrollmentAdmin)
admin.site.register(models.StudentFavoriteCourse,StudentFavoriteCourseAdmin)
