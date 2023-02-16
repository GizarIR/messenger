from django.shortcuts import render

from rest_framework import generics
from .models import Chat
from .serializers import ChatSerializer


class ChatAPIView(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
