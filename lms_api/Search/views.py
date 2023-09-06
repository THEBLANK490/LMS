from django.shortcuts import render
from main.models import Category,Teacher
from .models import SearchBar,TeacherSearchBar
from .serializers import SearchSerializer
from django.http import HttpResponse
from rest_framework import viewsets, generics

# Create your views here.
def search_data(request):
    data = Category.objects.values_list('title', flat=True)
    for title in data:
        if not SearchBar.objects.filter(title=title).exists():
            SearchBar.objects.create(title=title)
    return HttpResponse("Data imported successfully.")

class SearchViewSet(generics.ListCreateAPIView):
    queryset = SearchBar.objects.all()
    serializer_class = SearchSerializer

    def get_queryset(self):
        qs= SearchBar.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            qs = qs.filter(title__icontains=title)
        return qs

# for teacher search bar
def teacher_search_data(request):
    data = Teacher.objects.values_list('full_name', flat=True)
    for full_name in data:
        if not TeacherSearchBar.objects.filter(title=full_name).exists():
            TeacherSearchBar.objects.create(title=full_name)
    return HttpResponse("Data imported successfully.")

class TeacherSearchViewSet(generics.ListCreateAPIView):
    queryset = TeacherSearchBar.objects.all()
    serializer_class = SearchSerializer

    def get_queryset(self):
        qs= TeacherSearchBar.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            qs = qs.filter(title__icontains=title)
        return qs