from rest_framework import serializers
from .models import User 
from stable_app.serializers import StableSerializer
from list_app.serializer import ListSerializer

class UserSerializer(serializers.ModelSerializer):
    stable_id = StableSerializer()
    list = ListSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'stable_id', 'lists']

    