from django.urls import path
from .views import All_tasks, Select_task

urlpatterns = [
    path('<int:list_id>/task/', All_tasks.as_view(), name="all_tasks"),
    path('<int:list_id>/task/<int:task_id>/', Select_task.as_view(), name="all_tasks")
]