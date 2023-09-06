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
    profile_img = models.ImageField(upload_to='teacher_profile_imgs/', null=True, blank=True)
    skills = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "1. Teachers"

    def __str__(self):
        return self.full_name

    # Total Teacher Courses
    def total_teacher_courses(self):
        total_courses=Category.objects.filter(teacher=self).count()
        return total_courses
    
    # total Teacher Chapters
    def total_teacher_chapters(self):
        total_chapters=Chapter.objects.filter(course__teacher=self).count()
        return total_chapters
    
    # Total Teacher students
    def total_teacher_students(self):
        total_students=StudentCourseEnrollment.objects.filter(course__teacher=self).count()
        return total_students

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
    category = models.ForeignKey(CourseCategory,on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=100)
    description =  models.TextField()
    featured_img =models.ImageField(upload_to='course_imgs/',null=True,blank=True)
    languages = models.TextField(null=True)

    class Meta: 
        verbose_name_plural = "3. Categories"
    
    def total_enrolled_student(self):
        total_enrolled_student = StudentCourseEnrollment.objects.filter(course_id=self).count()
        return total_enrolled_student

    def __str__(self):
        return self.title
    

# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='course_chapters')
    title = models.CharField(max_length=100)
    description =  models.TextField()
    video =models.FileField(upload_to='chapter_videos/',null=True,blank=True)
    remarks = models.TextField(max_length=100)
    material =models.FileField(upload_to='chapter_material/',null=True,blank=True)

    class Meta:
        verbose_name_plural = "4. Chapter"

#Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=200)
    interested_categories = models.TextField()
    student_profile_img = models.ImageField(upload_to='teacher_profile_imgs/', null=True, blank=True)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name_plural = "5. Students"

    # Total Student My Courses
    def total_my_courses(self):
        student_total_courses=StudentCourseEnrollment.objects.filter(student=self).count()
        return student_total_courses
    
    # total Teacher Chapters
    def total_favorite_chapters(self):
        total_chapters=StudentFavoriteCourse.objects.filter(student=self).count()
        return total_chapters

# student Course Enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "6 .Enrolled Courses"

    def __str__(self):
        return f"{self.course}-{self.student}"
    
# Favorite course for student
class StudentFavoriteCourse(models.Model):
    course = models.ForeignKey(Category,on_delete=models.CASCADE)
    student = models.ForeignKey(Student,on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "7 .Student Favorite Courses"
    
    def __str__(self):
        return f"{self.course}-{self.student}"
    

    
