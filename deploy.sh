#!/bin/bash

echo "Сборка проекта в режиме production..."
npm run build

echo "Дополнительная проверка путей в HTML-файлах..."
# Проверка index.html на двойные пути /providers/providers/
if grep -q "/providers/providers/" build/index.html; then
  echo "ВНИМАНИЕ: Обнаружены пути с двойным префиксом /providers/providers/ в index.html!"
  echo "Запускаем дополнительное исправление..."
  # Запускаем fix-paths.js несколько раз, чтобы удалить все дублирующиеся пути
  for i in {1..3}; do
    node fix-paths.js
    # Проверяем, устранились ли все дублирующиеся пути
    if grep -q "/providers/providers/" build/index.html; then
      echo "Обнаружены дублирующиеся пути после $i-го запуска скрипта. Повторяем..."
    else
      echo "Пути успешно исправлены после $i-го запуска."
      break
    fi
  done
  
  # Финальная проверка
  if grep -q "/providers/providers/" build/index.html; then
    echo "ОШИБКА: Не удалось устранить все дублирующиеся пути автоматически!"
    echo "Проверяем содержимое index.html:"
    cat build/index.html
    
    # Вручную удаляем дублирующиеся пути
    echo "Применяем ручное исправление с помощью sed..."
    sed -i '' 's/\/providers\/providers\//\/providers\//g' build/index.html
    
    # Проверяем ещё раз
    if grep -q "/providers/providers/" build/index.html; then
      echo "КРИТИЧЕСКАЯ ОШИБКА: Не удалось устранить все дублирующиеся пути!"
      exit 1
    else
      echo "Пути успешно исправлены вручную."
    fi
  else
    echo "Все пути исправлены."
  fi
else
  echo "Пути в index.html в порядке."
fi

echo "Деплой на GitHub Pages..."
npm run deploy

echo "Деплой успешно завершен!" 