from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from .models import Horse 
from careList_app.models import CareList
from stable_app.models import Stable
from stable_app.serializers import StableSerializer
from user_app.views import tokenAuth 
from careList_app.serializers import CareListSerializer
from .serializers import HorseSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class All_horses(tokenAuth):
    def get(self, request, stable_id):
        try:
            stable = get_object_or_404(Stable, id=stable_id)
            horse = HorseSerializer(Horse.objects.filter(stable_id=stable), many=True)
            return Response(horse.data, status=HTTP_200_OK)
        except:
            return Response("Invalid stable id.", status=HTTP_404_NOT_FOUND)
    
    def post(self, request, stable_id):
            stable = Stable.objects.filter(id=request.user.id)
            print("STABLE: ", stable[0])
            # add_horse = Horse(**request.data, stable_id = stable)
            add_horse = Horse(**request.data, stable_id = stable[0])
            add_horse.full_clean()
            add_horse.save()
            print("HORSE: " , add_horse)
            care_list = CareList(horse_id=add_horse)
            care_list.full_clean()
            care_list.save()
            serialized_horse = HorseSerializer(add_horse)

            return Response(serialized_horse.data, status=HTTP_200_OK)



class Select_horse(tokenAuth):
    def get(self, request, stable_id, horse_id):
        try:
            horse = get_object_or_404(Horse, id=horse_id, stable_id_id=stable_id)
            select_horse = HorseSerializer(horse)
            return Response(select_horse.data)
        except:
            return Response("No horse found with that ID.", status=HTTP_404_NOT_FOUND)
    
    def delete(self, request, stable_id, horse_id):
        try:
            horse = get_object_or_404(Horse, id=horse_id, stable_id_id=stable_id)
            horse.delete()
            return Response(f'{horse.name} has been removed from the stable.', status=HTTP_204_NO_CONTENT)
        except:
            return Response("No horse found with that ID", status=HTTP_404_NOT_FOUND)

    

       