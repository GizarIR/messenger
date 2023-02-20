from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Chat, ChatParticipant


# Для срабатывания кода ниже его необходимо импортировать в apps.py AppConfig
#     def ready(self):
#         import app.signals
@receiver(post_save, sender=Chat)
def add_owner_to_participants(sender, instance, created, **kwargs):
    # logging.info(instance.pk, instance.owner, instance.participates)
    if created:
        chat_member = ChatParticipant.objects.create(chat=instance, participant=instance.owner)
        chat_member.save()
        # print(request.user)

