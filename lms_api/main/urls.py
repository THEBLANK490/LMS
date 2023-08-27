from . import views
from django.urls import path


urlpatterns = [
    #Teacher
    path('teacher/', views.TeacherRegisterApiView.as_view(), name='teacher_register'),
    path('teacher/validate/', views.TeacherEmailValidationView.as_view(), name='teacher_register'),
    path('teacher/<int:pk>',views.TeacherDetail.as_view()),
    path('teacher-login/',views.teacher_login),
    path('teacher-get/',views.teacher_list),
    path('teachers/',views.TeacherLists.as_view()),
    path('teacher/dashboard/<int:pk>',views.TeacherDashboard.as_view()),

    #category
    path('category/',views.CategoryList.as_view()),

    #course
    path('courses/',views.CourseLists.as_view()),
    path('course/',views.CourseList),
    path('course-get/',views.course_list),

    # specific course detail
    path('course/<int:pk>/',views.CourseDetailView.as_view()),

    #chapter
    path('chapter/',views.ChapterList.as_view()),

    #Specific Course Chapter
    path('course-chapters/<int:course_id>',views.CourseChapterList.as_view()),

    #Specific Chapter
    path('chapter/<int:pk>',views.ChapterDetailView.as_view()),

    #course
    path('teacher-courses/<int:teacher_id>',views.TeacherCourseList.as_view()),

    #Course Detail
    path('teacher-courses-detail/<int:pk>',views.TeacherCourseDetail.as_view()),


    # Student   
    path('student_register/', views.StudentRegisterApiView.as_view(), name='student_register'),
    path('student_register/validate/', views.StudentEmailValidationView.as_view(), name='student_register'),
    path('student-login/',views.student_login),

    path('student-enroll-course/',views.StudentEnrollCourseList.as_view()),

     path('fetch-enroll-status/<int:student_id>/<int:course_id>',views.fetch_enroll_status),
     path('fetch-all-enroll-students/',views.EnrolledStudentList.as_view()),
     path('fetch-all-enroll-students/<int:teacher_id>',views.EnrolledStudentList.as_view()),
     path('fetch-enroll-students/<int:course_id>',views.EnrolledStudentList.as_view()),

]

