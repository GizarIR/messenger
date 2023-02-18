from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import *

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # pass
    list_display = ['username','first_name', 'last_name', 'email', 'is_staff']
    list_editable = ['is_staff']
    list_filter = ['username', ]
    search_fields = ['username', ]


class ChatAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', "is_private"]
    # list_editable = ['name', 'participates']
    # list_filter = ['username', ]
    # search_fields = ['username', ]

class MessageAdmin(admin.ModelAdmin):
    pass

class ChatParticipantAdmin(admin.ModelAdmin):
    pass



admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Chat, ChatAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(ChatParticipant, ChatParticipantAdmin)