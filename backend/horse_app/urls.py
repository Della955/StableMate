from django.urls import path
from .views import All_horses, Select_horse
urlpatterns = [
    path('<int:stable_id>/horse/', All_horses.as_view(), name='all_horses'),
    path('<int:stable_id>/horse/<int:horse_id>/', Select_horse.as_view(), name='select_horse')
]