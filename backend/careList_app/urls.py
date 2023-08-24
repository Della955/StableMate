from django.urls import path
from .views import Horse_CareList, Select_CareList
urlpatterns = [
    path('<int:stable_id>/horse/<int:horse_id>/carelist/', Horse_CareList.as_view(), name="carelist"),
    path('horse/<int:horse_id>/carelist/<int:care_list_id>/', Select_CareList.as_view(), name="select_care_list")

]