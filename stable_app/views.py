from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED
from rest_framework.response import Response
from .models import Stable 
from .serializers import StableSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class View_stable(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    #get the stable name 
    def get(self, request):
        stable = StableSerializer(Stable.objects.all(), many=True)
        return Response(stable.data, status=HTTP_200_OK)


class Change_stable_name(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    #change the stable name 
    def put(self, request, stable_id):
        get_stable = get_object_or_404(Stable, id=stable_id)
        if 'name' in request.data:
            get_stable.name = request.data.get("name")
        get_stable.full_clean()
        get_stable.save()
        return Response(status=HTTP_201_CREATED)
     
