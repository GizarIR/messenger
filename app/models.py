from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/%Y/%m/%d/', default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.username}'

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Chat(models.Model):
    name = models.CharField(max_length=128, verbose_name='Имя чата')
    time_create = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        verbose_name="Владелец",
    )
    is_private = models.BooleanField(default=False, verbose_name='Личный')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'


class ChatParticipant(models.Model):
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE, verbose_name="Чат")
    participant = models.ForeignKey('User', on_delete=models.CASCADE, verbose_name="Автор")

    def __str__(self):
        return f'{self.chat} - {self.participant}'

    class Meta:
        verbose_name = 'Участник чата'
        verbose_name_plural = 'Участники чатов'

class Message(models.Model):
    author = models.ForeignKey('User', on_delete=models.CASCADE, verbose_name="Автор")
    message = models.TextField(verbose_name='Сообщение')
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE, verbose_name="Чат")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    def __str__(self):
        return f'{self.id} : {self.message[:10]}'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'