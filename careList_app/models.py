from django.db import models
from horse_app.models import Horse 
from datetime import date
# Create your models here.
class CareList (models.Model):
    feed_type = models.CharField(default="hay")
    supplements = models.CharField(default="no supplements")
    turnout = models.BooleanField(default=True)
    farrier = models.DateField(default=date.today)
    horse_id = models.OneToOneField(Horse,on_delete=models.CASCADE,related_name='care_list')


    def __str__(self):
        return f'{self.feed_type} {self.supplements} {self.turnout} {self.horse_id} {self.farrier}'