from django.contrib import admin

# Register your models here.
from .models import Horse
admin.site.register([Horse])