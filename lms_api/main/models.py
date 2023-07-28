from django.db import models

# Create your models here.
# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    detail = models.CharField(max_length=100,default=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=100)
    skills = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "1. Teachers"

# CourseCategory Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=100)
    description =  models.TextField()

    class Meta:
        verbose_name_plural = "2. Course Categories"
    
    def __str__(self):
        return self.title

# Course Model
class Category(models.Model):
    category = models.ForeignKey(CourseCategory,on_delete=models.CASCADE,null=True)
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True,related_name='teacher_courses')
    title = models.CharField(max_length=100)
    description =  models.TextField()
    featured_img =models.ImageField(upload_to='course_imgs/',null=True,blank=True)
    languages = models.TextField(null=True)

    class Meta: 
        verbose_name_plural = "3. Categories"
    
    def total_enrolled_student(self):
        total_enrolled_student = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_student

    def __def__(self):
        return self.title
    

# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length=100)
    description =  models.TextField()
    video =models.FileField(upload_to='chapter_videos/',null=True,blank=True)
    remarks = models.TextField(max_length=100)

    class Meta:
        verbose_name_plural = "4. Chapter"

#Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=200)
    interested_categories = models.TextField()

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name_plural = "5. Students"

# student Course Enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6 .Enrolled Courses"
    
    def __str__(self):
        return f"{self.course}-{self.student}"
