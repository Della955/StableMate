from rest_framework import serializers
from .models import CareList

class CareListSerializer(serializers.ModelSerializer):

    class Meta:
        models = CareList
        fields = ['id', 'feed_type', 'supplements', 'turnout', 'farrier']