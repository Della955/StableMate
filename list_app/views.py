from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from .models import List 
from .serializer import ListSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class All_list(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        lists = ListSerializer(List.objects.all(), many=True)
        return Response(lists.data, status=HTTP_200_OK)
    
    def post(self, request):
        create_list = List(**request.data, user=request.user)
        create_list.full_clean()
        create_list.save() 
        create_list = ListSerializer(create_list)
        return Response(create_list.data, status=HTTP_201_CREATED)

class Select_list(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, list_id):
        get_list = get_object_or_404(List, id=list_id)
        get_list = ListSerializer(get_list)
        return Response(get_list.data, status=HTTP_200_OK)
    
    def delete(self, request, list_id):
        get_list = get_object_or_404(List, id=list_id)
        get_list.delete()
        return Response(status=HTTP_204_NO_CONTENT)

