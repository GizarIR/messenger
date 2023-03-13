# Messenger
This is basic messenger with the following functions:

- sending and receiving messages;
- creating, editing and deleting group chats and correspondence in them;
- editing user's personal information (name and avatar);
- view the list of other users with the transition to sending them messages.

Project include 2 part:
1. Server - based on Django REST framework, needed Redis;
2. Client - folder of messenger_client, based on JS, HTML, CSS. 
   For more information about start Client messenger read README.md from folder messenger_client.

Проект состоит из backend и frontend частей. 
Для того чтобы проект заработал необходимо сначала запустить серверную часть, 
а затем подключиться к ней при помощи клиентской части.

Инструкция по запуску проекта из командной строки:
1. У вас должен быть установлен Redis server, который запущен и доступен: <br> по адресу 127.0.0.1 порт 6379
2. Создайте папку, для сохранения проекта: <br> ```mkdir messenger_dir```
3. Перейдите в папку проекта: <br> ``` cd messenger_dir/```
4. Клонируйте репозиторий проекта в папку messenger: <br> ```git clone https://github.com/GizarIR/messenger.git```
5. Устанавливаем виртуальное окружение проекта: <br> ```python3 -m venv venv```
6. Перейдите в папку проекта: <br> ``` cd messenger/```
5. Установите зависимости для проекта: <br> ```pip install -r requirements.txt```
6. Убедитесь, что у вас запущен Redis, если это не так, то запустите его: <br> ```redis-server```
7. Запустите серверную часть проекта: <br> ```python manage.py runserver```
8. Далее переходим к запуску клиента. Откройте еще один терминал.
9. Перейдите в папку проекта ```messenger_dir/messeger/```. 
10. В папке проекта перейдите в папку клиентской части: <br> ```cd messenger_client```
11. Для запуска приложения, которое будет обслуживать клиентскую часть выполните команду: <br> ```python3 -m http.server 8080 --bind 127.0.0.1``` <br> меняя параметр 8080 можно запустить несколько экземпляров клиентского приложения в новых терминалах
12. Перейдите в браузер и в адресной строке выполните: <br> ```http://localhost:8080/index.html``` 
13. В браузере откроется страница клиента мессенджера.

Клиентскую часть проекта также можно запустить с использованием Live server. 
Для этого нужно открыть папку клиентской части проекта ```messenger_client``` в VS Code, и запустить расширение Live server.   


