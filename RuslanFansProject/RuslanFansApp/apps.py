from django.apps import AppConfig


class RuslanfansappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'RuslanFansApp'

    def ready(self):
        import RuslanFansApp.signals
