from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from .serializer import CalendarSerializer
from .models import Calendar
from user_app.views import tokenAuth
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class All_events(tokenAuth): 

    def get(self, request):
        events = CalendarSerializer(Calendar.objects.all(), many=True)
        return Response(events.data, status=HTTP_200_OK)
    
        
    def post(self, request):
        create_event = Calendar(**request.data, user_id=request.user)
        create_event.full_clean()
        create_event.save() 
        create_event = CalendarSerializer(create_event)
        return Response(create_event.data, status=HTTP_201_CREATED)
    

class Select_event(tokenAuth):
    def delete(self, request, event_id):
        get_event = get_object_or_404(Calendar, id=event_id)
        get_event.delete() 
        return Response(status=HTTP_204_NO_CONTENT)
    