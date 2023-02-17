from django.shortcuts import render
import logging


from rest_framework import generics, request
from rest_framework.permissions import IsAuthenticated

# Импорты обработки сигналов
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Chat, User
from .serializers import ChatSerializer



logging.basicConfig(level=logging.DEBUG)


# @receiver(post_save, sender=Chat)
# def add_owner_to_participates(sender, instance, created, **kwargs):
#     # logging.info(instance.pk, instance.owner, instance.participates)
#     chat = Chat.objects.get(pk=instance.pk)
#     user = User.objects.get(username=instance.owner)
#     logging.info(f'{chat} : {user}')
#     chat.participates.add(user)


class ChatAPILIstView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatAPIUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)


