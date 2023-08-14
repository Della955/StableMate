from django.urls import path
from .views import View_stable, Change_stable_name

urlpatterns = [
    path("", View_stable.as_view(), name="stable"),
    path("<int:stable_id>/", Change_stable_name.as_view(), name="change_name")
]