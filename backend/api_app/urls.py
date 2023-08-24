from django.urls import path
from .views import Noun_Project, Barn_image
urlpatterns = [
    path('', Noun_Project.as_view(), name="noun_project"),
    path("barn/", Barn_image.as_view(), name="barn_image")
]