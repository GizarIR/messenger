from rest_framework import serializers
from .models import Chat, Message, User, ChatParticipant


class ChatSerializer(serializers.ModelSerializer):
    # owner = serializers.HiddenField(default=serializers.CurrentUserDefault()) #позволяет скрыть поле при заполнении
    owner = serializers.CurrentUserDefault() # заполняет поле значением по умолчанию
    class Meta:
        model = Chat
        fields = ("__all__")

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('author', 'message', 'chat', 'time_create', 'time_update')

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'avatar', 'email')

class ChatParticipantListSerialaizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username",)

class ChatParticipantSerialaizer(serializers.ModelSerializer):
    class Meta:
        model = ChatParticipant
        fields = ("__all__")
