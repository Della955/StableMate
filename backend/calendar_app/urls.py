from django.urls import path
from .views import All_events, Select_event
urlpatterns = [
    path("", All_events.as_view(), name="all_list"),
    path("<int:event_id>/", Select_event.as_view(), name="event")
]