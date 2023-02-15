from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/%Y/%m/%d/', default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.username}'

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'