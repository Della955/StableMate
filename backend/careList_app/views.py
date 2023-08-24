from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED
from rest_framework.response import Response
from .models import CareList 
from user_app.views import tokenAuth 
from stable_app.models import Stable 
from .serializers import CareListSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from horse_app.models import Horse 
# Create your views here.

class Horse_CareList(tokenAuth):
    def get(self, request, stable_id, horse_id):
        stable_id = get_object_or_404(Stable, id=stable_id)
        care_list = CareListSerializer(CareList.objects.filter(horse_id_id=horse_id), many=True)
        return Response(care_list.data)

    def put(self, request, stable_id, horse_id):
        care_list = get_object_or_404(CareList, id=horse_id)
        if "feed_type" in request.data:
            care_list.feed_type = request.data.get("feed_type")
        if "supplements" in request.data:
            care_list.supplements = request.data.get("supplements")
        if "turnout" in request.data:
            care_list.turnout = request.data.get("turnout")
        if "farrier" in request.data:
            care_list.farrier = request.data.get("farrier")
        care_list.full_clean()
        care_list.save()
        return Response("Care list has been updated", status=HTTP_200_OK)


class Select_CareList(tokenAuth): 
    def put(self, request, stable_id, horse_id, care_list_id):
        care_list = get_object_or_404(CareList, horse_id=care_list_id)
        if "feed_type" in request.data:
            care_list.feed_type = request.data.get("feed_type")
        if "supplements" in request.data:
            care_list.supplements = request.data.get("supplements")
        if "turnout" in request.data:
            care_list.turnout = request.data.get("turnout")
        if "farrier" in request.data:
            care_list.farrier = request.data.get("farrier")
        
        care_list.full_clean()
        care_list.save()
        return Response("Care list has been updated", status=HTTP_200_OK)
