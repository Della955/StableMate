from rest_framework import serializers
from .models import Horse 
from careList_app.serializers import CareListSerializer

class HorseSerializer(serializers.ModelSerializer):
    care_list = CareListSerializer() 
    class Meta:
        model = Horse 
        fields = ['id', 'name', 'age', 'care_list']