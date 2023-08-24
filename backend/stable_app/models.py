from django.db import models
from user_app.models import User 
# Create your models here.
class Stable(models.Model):
    #create a one to one relationship with each user
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="stable")
    name = models.CharField() 
