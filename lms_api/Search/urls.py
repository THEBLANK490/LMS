from . import views
from django.urls import path


urlpatterns = [
        path('',views.search_data),
        path('search-teacher/',views.teacher_search_data),
        path('get-data/',views.SearchViewSet.as_view()),
        path('get-teacher-data/',views.TeacherSearchViewSet.as_view()),
]