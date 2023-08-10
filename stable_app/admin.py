from django.contrib import admin

# Register your models here.
from .models import Stable
admin.site.register([Stable])