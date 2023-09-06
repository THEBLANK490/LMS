from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id','full_name','detail','email','password','qualification','mobile_no','skills','teacher_courses','profile_img']
        depth = 1
    
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['total_teacher_courses','total_teacher_chapters','total_teacher_students']

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['total_my_courses','total_favorite_chapters']


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id','title','description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ['id','category', 'title', 'description', 'teacher', 'featured_img', 'languages','course_chapters','total_enrolled_student']
        depth = 1

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id','course', 'title', 'description', 'video', 'remarks','material']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id','full_name','email','password','username','interested_categories','student_profile_img']
        # fields = ['id','full_name','email','password','username','interested_categories']

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id','student','course','enrolled_time']
        depth = 2

class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavoriteCourse
        fields = ['id','student','course','status']
    
    def __init__(self, *args, **kwargs):
        super(StudentFavoriteCourseSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2