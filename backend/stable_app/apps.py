from django.apps import AppConfig


class StableAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'stable_app'
