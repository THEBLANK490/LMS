from django.db import models


# Create your models here.
class SearchBar(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return str(self.title)
    
class TeacherSearchBar(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return str(self.title)