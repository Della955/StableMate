from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from .models import User
from stable_app.models import Stable
from list_app.models import List
from django.contrib.auth import authenticate

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class Sign_up(APIView):
    def post(self, request):
        print("Request sign up")
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(**request.data)
        stable = Stable.objects.create(user=user)
        list = List.objects.create(user=user)
        token = Token.objects.create(user=user)
        return Response(
            {"user": user.email, "token": token.key}, status=HTTP_201_CREATED
        )   
    
class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)


class tokenAuth(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(tokenAuth):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class Info(tokenAuth):
    def get(self, request):
        try:
            return Response({"username": request.user.email})
        except:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)

class Master_sign_up(APIView):

    def post(self, request):
        request.data["username"] = request.data["email"] 
        master_user = User.objects.create_user(**request.data)
        master_user.is_staff = True
        master_user.is_superuser = True
        master_user.save()
        token = Token.objects.create(user=master_user)
        return Response(
            {"master_trainer": master_user.email, "token": token.key}, status=HTTP_201_CREATED
        )


