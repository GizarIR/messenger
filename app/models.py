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
    participates = models.ManyToManyField(
        'User',
        verbose_name='Участники',
        related_name='participates'
    )
    owner = models.ForeignKey(
        'User',
        on_delete=models.PROTECT,
        verbose_name="Владелец",
        related_name="owner2user",
    )

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'

class Message(models.Model):
    author = models.ForeignKey('User', on_delete=models.PROTECT, verbose_name="Автор")
    message = models.TextField(verbose_name='Сообщение')
    chat = models.ForeignKey('Chat', on_delete=models.PROTECT, verbose_name="Чат")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Обновлено")

    def __str__(self):
        return f'{self.message[:10]}'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'