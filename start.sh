!/usr/bin/env sh
#Start project without PyCharm
cd ../
source venv/bin/activate
echo "Environment activated"
cd project/
echo "Redis Server will start up"

if [[ "$OSTYPE" == "darwin"* ]]; then
  osascript <<END
  tell application "Terminal"
      do script "redis-server"
  end tell
END
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  if command -v gnome-terminal &> /dev/null; then
    gnome-terminal --command='redis-server'
  elif command -v xterm &> /dev/null; then
    xterm -e "redis-server"
  else
    echo "Не удалось найти терминал для запуска redis-server"
  fi
else
  echo "Операционная система не поддерживается"
fi

echo "Django Server will start up"
python manage.py runserver



