from rest_framework import serializers
from .models import Chat, Message, User, ChatParticipant


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('name', 'time_create', 'owner', 'is_private')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('author', 'message', 'chat', 'time_create', 'time_update')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'avatar')

class ChatParticipant(serializers.ModelSerializer):
    class Meta:
        model = ChatParticipant
        fields = ('chat', 'participant')