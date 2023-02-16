from rest_framework import serializers
from .models import Chat, Message, User


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('name', 'time_create', 'owner', 'participates')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('author', 'message', 'chat', 'time_create', 'time_update')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'avatar')