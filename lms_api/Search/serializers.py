from rest_framework import serializers
from .models import SearchBar

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchBar
        fields = ['id','title']