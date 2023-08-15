from django.urls import path
from .views import All_list, Select_list 
urlpatterns = [
    path("", All_list.as_view(), name="all_list"),
    path("<int:list_id>/", Select_list.as_view(), name="select_list")
]