from django.db.models import Q
from django.shortcuts import render
import logging


from rest_framework import generics, request, viewsets, mixins, permissions
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Chat, User, ChatParticipant
from .serializers import ChatSerializer, UserSerializer, \
    ChatParticipantListSerialaizer, ChatParticipantSerialaizer

from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token

logging.basicConfig(level=logging.DEBUG)

class IsOwnerChatOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


# Список всех чатов
class ChatAPIListView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            vip_qs = ChatParticipant.objects.filter(participant=user).values('chat')
            queryset = Chat.objects.filter(Q(is_private=False) | (Q(is_private=True) & Q(pk__in = vip_qs)))
        else:
            queryset = Chat.objects.filter(is_private=False)
        return queryset


# Чтение, изменение отдельной записи
class ChatAPIUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerChatOrReadOnly) # настройка доступа

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            vip_qs = ChatParticipant.objects.filter(participant=user).values('chat')
            queryset = Chat.objects.filter(Q(is_private=False) | (Q(is_private=True) & Q(pk__in = vip_qs)))
        else:
            queryset = Chat.objects.filter(is_private=False)
        return queryset


class ChatAPIDestroyView(generics.DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated, IsOwnerChatOrReadOnly) # настройка доступа


class UserAPIUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class ChatParticipantAPIListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = ChatParticipantListSerialaizer

    def get_queryset(self):
        chat_id = self.kwargs["pk"]
        print("Queried Chat Participants fro CHAT:", chat_id)
        # queryset = ChatParticipant.objects.filter(chat=chat_id)
        queryset = User.objects.filter(pk__in=ChatParticipant.objects.filter(chat=chat_id).values("participant"))
        return queryset


class ChatParticipantAPICreateView(generics.ListCreateAPIView):
    queryset = ChatParticipant.objects.all()
    serializer_class = ChatParticipantSerialaizer
    # permission_classes = (IsAuthenticated,)

class ChatParticipantAPIRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = ChatParticipant.objects.all()
    serializer_class = ChatParticipantSerialaizer
    # permission_classes = (IsAuthenticated,)

    # Ищем объект не по ID а по другим  параметрам полей
    def get_object(self):
        queryset = self.get_queryset()
        chat_id = self.kwargs["chat_pk"]
        participant_id = self.kwargs["participant_pk"]
        # queryset = ChatParticipant.objects.filter(chat=chat_id)
        obj = queryset.filter(chat_id=chat_id, participant_id=participant_id).first()
        return obj


# class ChatParticipantAPIDestroyView(generics.DestroyAPIView):
#     queryset = ChatParticipant.objects.all()
#     serializer_class = ChatParticipantSerialaizer
#     permission_classes = (IsAuthenticated,)
