from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Chat
from .serializers import ChatSerializer


class ChatAPILIstView(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

class ChatAPIUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)


