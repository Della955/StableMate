from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED
from rest_framework.response import Response
from .models import Task 
from list_app.models import List
from user_app.views import tokenAuth 
from .serializers import TaskSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class All_tasks(tokenAuth):
    def get(self, request, list_id):
        list = get_object_or_404(List, id=list_id)
        task = TaskSerializer(Task.objects.filter(list_id=list), many=True)
        return Response(task.data, status=HTTP_200_OK)
    
    def post(self, request, list_id):
        list = get_object_or_404(List, id=list_id)
        task = Task(**request.data, list_id=list)
        task.save() 
        task = TaskSerializer(task)
        return Response(task.data, status=HTTP_201_CREATED)


class Select_task(tokenAuth):
    def get (self, request, list_id, task_id):
        task = get_object_or_404(Task, id=task_id, list_id=list_id)
        task = TaskSerializer(task)
        return Response(task.data)

    def put(self, request, list_id, task_id):
        task = get_object_or_404(Task, id=task_id, list_id=list_id)

        if 'task_name' in request.data:
            task.task_name = request.data.get("task_name")
        if 'is_complete' in request.data:
            task.change_complete_status()
        task.save()
        return Response(status=HTTP_201_CREATED)

    def delete(self, request, list_id, task_id):
        task = get_object_or_404(Task, id=task_id, list_id=list_id)
        task.delete() 
        return Response(status=HTTP_204_NO_CONTENT) 