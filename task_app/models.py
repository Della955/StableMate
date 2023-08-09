from django.db import models
from list_app.models import List 

# Create your models here.
class Task(models.Model):
    list_id = models.ForeignKey(List, on_delete=models.CASCADE, related_name='tasks')
    task_name = models.CharField()
    is_complete = models.BooleanField(default=False) 