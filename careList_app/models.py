from django.db import models
from horse_app.models import Horse 
# Create your models here.
class CareList (models.Model):
    feed_type = models.CharField()
    supplements = models.CharField()
    turnout = models.BooleanField(default=True)
    farrier = models.DateField()
    horse_id = models.OneToOneField(Horse, related_name='care_list', on_delete=models.CASCADE)