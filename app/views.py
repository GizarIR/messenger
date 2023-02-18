from django.shortcuts import render
import logging


from rest_framework import generics, request, viewsets, mixins, permissions
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Chat, User, ChatParticipant
from .serializers import ChatSerializer


logging.basicConfig(level=logging.DEBUG)

# Список всех чатов
class ChatAPIListView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


# Чтение, изменение, удаление отдельной записи
class ChatAPIUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,) # настройка доступа


class IsOwnerChatOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

class ChatAPIDestroyView(generics.DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated, IsOwnerChatOrReadOnly) # настройка доступа
