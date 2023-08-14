from django.db import models
from stable_app.models import Stable 
# Create your models here.
class Horse(models.Model):
    stable_id = models.ForeignKey(Stable, on_delete=models.CASCADE, related_name='horses')
    name = models.CharField()
    age = models.PositiveIntegerField() 


    def __str__(self):
        return f'{self.name} {self.age}'
    
