# app/routing.py

from django.urls import  re_path, path

from . import consumers

websocket_urlpatterns = [
    # re_path(r"ws/chat/(?P<chat_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
    re_path(r"ws/chat/(?P<chat_name>\w+)/(?P<token>/token=\w+)?", consumers.ChatConsumer.as_asgi()),
    # path("ws/chat/<str:chat_name>/?token=<str:token>/", consumers.ChatConsumer.as_asgi()),
    # path("ws/chat/<str:chat_name>/", consumers.ChatConsumer.as_asgi()),
]