from django.db import models
from datetime import date 
from user_app.models import User 
# Create your models here.
class Calendar(models.Model):
    title = models.CharField(default="task")
    start_time = models.CharField()
    end_time = models.CharField() 
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")
