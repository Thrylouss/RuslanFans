from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register([Profile, Posts, Comments, Bookmark,
                     Subscriptions, Messages, Notifications, Wallet])
