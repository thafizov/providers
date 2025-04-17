const fs = require('fs');
const path = require('path');

// Пути к собранным файлам
const indexPath = path.join(__dirname, 'build', 'index.html');
const nojekyllPath = path.join(__dirname, 'build', '.nojekyll');

// Создаем файл .nojekyll, если его еще нет
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '', 'utf8');
  console.log('Создан файл .nojekyll для GitHub Pages');
}

// Читаем содержимое index.html
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении index.html:', err);
    return;
  }

  // Рекурсивно удаляем дублирующиеся префиксы /providers/providers/
  let fixedHtml = data;
  
  // Выполняем замену до тех пор, пока не перестанут находиться дублирующиеся пути
  while (fixedHtml.includes('/providers/providers/')) {
    fixedHtml = fixedHtml.replace(/\/providers\/providers\//g, '/providers/');
  }

  // Проверяем, что все пути относительны к /providers/
  fixedHtml = fixedHtml
    .replace(/src="(\/(?!providers)[^"]+)/g, 'src="/providers$1')
    .replace(/href="(\/(?!providers)[^"]+)/g, 'href="/providers$1');

  // Записываем исправленный HTML обратно
  fs.writeFile(indexPath, fixedHtml, 'utf8', (err) => {
    if (err) {
      console.error('Ошибка при записи исправленного index.html:', err);
      return;
    }
    console.log('Пути в index.html успешно исправлены!');
  });
}); 