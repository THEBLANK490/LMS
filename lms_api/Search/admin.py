from django.contrib import admin
from .models import SearchBar,TeacherSearchBar
# Register your models here.
class SearchAdmin(admin.ModelAdmin):
    list_display = ["title"]
    search_fields = ['title']
    list_filter = ['title']

admin.site.register(SearchBar,SearchAdmin)
admin.site.register(TeacherSearchBar,SearchAdmin)