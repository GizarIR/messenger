!/usr/bin/env sh
#Start project without PyCharm
cd ../
source venv/bin/activate
echo "Environment activated"
cd project/
echo "Django Server will start up"
python manage.py runserver

