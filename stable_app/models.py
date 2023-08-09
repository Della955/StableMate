from django.db import models
from user_app.models import User 
# Create your models here.
class Stable(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="stable_id")