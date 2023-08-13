from rest_framework import serializers
from horse_app.serializers import HorseSerializer
from .models import Stable

class StableSerializer(serializers.ModelSerializer):
    horses = HorseSerializer(many=True)
    class Meta:
        model = Stable
        fields = ['id', 'user', 'name', 'horses']

