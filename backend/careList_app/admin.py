from django.contrib import admin

# Register your models here.
from .models import CareList
admin.site.register([CareList])