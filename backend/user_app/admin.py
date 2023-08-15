from django.contrib import admin
from list_app.models import List 

# Register your models here.
from .models import User
admin.site.register([User])