from django.shortcuts import render
import logging


from rest_framework import generics, request
from rest_framework.permissions import IsAuthenticated


from .models import Chat, User, ChatParticipant
from .serializers import ChatSerializer


logging.basicConfig(level=logging.DEBUG)


class ChatAPILIstView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatAPIUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)


