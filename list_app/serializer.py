from rest_framework import serializers
from .models import List  
from task_app.serializers import TaskSerializer

class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)
    class Meta:
        model = List 
        fields = ['id', 'list_name', 'tasks']



