from django.shortcuts import render
from rest_framework.views import APIView 
from django.views import View
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .serializers import TeacherSerializer, CourseCategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer,StudentCourseEnrollSerializer,TeacherDashboardSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from . import models
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ParseError

# Create your views here.

class TeacherRegisterApiView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if models.Teacher.objects.filter(email=email).exists():
            return Response({'error': 'Teacher already exists with this email.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherEmailValidationView(View):
    def get(self, request):
        email = request.GET.get('email')
        exists = models.Teacher.objects.filter(email=email).exists()
        return JsonResponse({'exists': exists})

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer

# all teachers ko lagi view
class TeacherLists(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer

# for teacher Dashboard
class TeacherDashboard(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer


@csrf_exempt
def teacher_login (request):
    try:
        email = request.POST['email']
        password = request.POST['password']
        teacherData = models.Teacher.objects.get(email=email,password=password)
        if (teacherData):
            return JsonResponse({'bool':True,'teacher_id':teacherData.id})
        else: 
            return JsonResponse({'bool':False})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Invalid email or password'})
    
@csrf_exempt
@api_view(['GET'])
def teacher_list(request):
    if request.method == 'GET':
        qs = models.Teacher.objects.all()
        if 'result' in request.GET:
            limit = int(request.GET['result'])
            qs = qs.order_by('-id')[:limit]
        serializer = TeacherSerializer(qs, many=True)
        return Response(serializer.data)

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer

# all courses ko lagi view
class CourseLists(generics.ListCreateAPIView):
    queryset = models.Category.objects.all()
    serializer_class = CourseSerializer


    # def get_queryset(self):
    #     qs= super().get_queryset()
    #     if 'result' in self.request.GET:
    #         limit = int (self.request.GET['result'])
    #         qs = models.Category.objects.all().order_by('-id')[:limit]
    #     return qs



@csrf_exempt
@api_view(['GET'])
def course_list(request):
    if request.method == 'GET':
        qs = models.Category.objects.all()
        if 'result' in request.GET:
            limit = int(request.GET['result'])
            qs = qs.order_by('-id')[:limit]
        serializer = CourseSerializer(qs, many=True)
        return Response(serializer.data)

@csrf_exempt
def CourseList(request):
    if request.method == 'POST':
        # Process the form data received from React
        teacher_id = request.POST.get('teacherId')
        category = request.POST.get('category')
        title = request.POST.get('title')
        description = request.POST.get('description')
        featured_img = request.FILES.get('featured_img')
        languages = request.POST.get('languages')
        category_instance = get_object_or_404(models.CourseCategory, id=category)
        teacher_instance = get_object_or_404(models.Teacher,id=teacher_id)

        my_model_instance = models.Category(
            category=category_instance,
            teacher=teacher_instance,
            title=title,
            description=description,
            featured_img=featured_img,
            languages=languages,
        )
        my_model_instance.save()

        # Return a JSON response to indicate success
        return JsonResponse({'message': 'Form data submitted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Category.objects.all()
    serializer_class = CourseSerializer

class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk = teacher_id)
        return models.Category.objects.filter(teacher = teacher)

class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Category.objects.all() #gets the current object data
    serializer_class = CourseSerializer
    
    
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer

class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Category.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset= models.Chapter.objects.all()
    serializer_class = ChapterSerializer

# student
class StudentRegisterApiView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if models.Student.objects.filter(email=email).exists():
            return Response({'error': 'User already exists with this email.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentEmailValidationView(View):
    def get(self, request):
        email = request.GET.get('email')
        exists = models.Student.objects.filter(email=email).exists()
        return JsonResponse({'exists': exists})

@csrf_exempt
def student_login (request):
    try:
        email = request.POST['email']
        password = request.POST['password']
        studentData = models.Student.objects.get(email=email,password=password)
        if (studentData):
            return JsonResponse({'bool':True,'student_id':studentData.id})
        else: 
            return JsonResponse({'bool':False})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Invalid email or password'})
    
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Extract student_id and course_id from the request data
            student_id = int(request.data.get('student'))
            course_id = int(request.data.get('course'))
        except (ValueError, TypeError):
            raise ParseError('Invalid student or course ID format.')

        # Check if the enrollment already exists for the given student and course
        existing_enrollment = models.StudentCourseEnrollment.objects.filter(student=student_id, course=course_id).exists()
        if existing_enrollment:
            return Response({'error': 'Enrollment already exists for this student and course.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the student and course instances
        student_instance = get_object_or_404(models.Student, id=student_id)
        course_instance = get_object_or_404(models.Category, id=course_id)

        # Create the enrollment
        enrollment = models.StudentCourseEnrollment(student=student_instance, course=course_instance)
        enrollment.save()

        return Response({'message': 'Enrollment created successfully.'}, status=status.HTTP_201_CREATED)

# Kati otta students enrolled cha tesko lagi view
def fetch_enroll_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Category.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else: 
        return JsonResponse({'bool':False})

# Teacher Dashboard ma number of Students dekhauna View
class EnrolledStudentList(generics.ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Category.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()



