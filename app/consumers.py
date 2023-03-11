#  app/consumers.py
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import (
    WebsocketConsumer, # синхронный сервер
    AsyncWebsocketConsumer # ассинхронный сервер
)


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_name = self.scope['url_route']['kwargs']['chat_name'] # chat_name берем из routing.py
        # self.chat_name = "lobby"
        print("CHAT_NAME: ", self.chat_name)
        self. chat_group_name = f'chat_{self.chat_name}'
        print("USER: ",  self.scope["user"])
        # print(self.scope["user"].email)

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()
        

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message', # имя функции описанной ниже
                'message': "User: " + self.scope["user"].username + " online..."
            }
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message', # имя функции описанной ниже
                'message': "User: " + self.scope["user"].username + " offline..."
            }
        )        
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print("TEXT_DATA",text_data)
        message = self.scope["user"].username + ": "+ text_data_json["message"]

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message', # имя функции описанной ниже
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message,
        }))
