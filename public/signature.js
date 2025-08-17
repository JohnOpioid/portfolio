(function() {
  // Функция определения светлоты фона
  function isLightBackground(element) {
    const style = window.getComputedStyle(element);
    const bgColor = style.backgroundColor;
    
    // Если фон прозрачный, проверяем родительские элементы
    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      if (element.parentElement) {
        return isLightBackground(element.parentElement);
      }
      // Если дошли до body, возвращаем true (считаем светлым по умолчанию)
      return true;
    }
    
    // Парсим RGB значения
    const rgb = bgColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return true;
    
    // Вычисляем яркость по формуле W3C
    const brightness = (parseInt(rgb[0]) * 299 + 
                       parseInt(rgb[1]) * 587 + 
                       parseInt(rgb[2]) * 114) / 1000;
    
    return brightness > 128; // Пороговое значение для светлого/тёмного
  }

  // Создаём элемент
  const creditLink = document.createElement('div');
  creditLink.className = 'design-credit';
  
  // Определяем положение скрипта
  const parentElement = document.currentScript.parentNode;
  
  // Проверяем фон
  const isLight = isLightBackground(parentElement);
  
  // Устанавливаем стили в зависимости от фона
  if (isLight) {
    creditLink.innerHTML = `
      <a href="https://desjo.ru/" target="_blank" style="font-family: sans-serif; color: #314158; font-weight: 300;">
        Design by <span style="font-weight: 900">DЖ<span style="color: #818cf8;">О</span></span>
      </a>
    `;
  } else {
    creditLink.innerHTML = `
      <a href="https://desjo.ru/" target="_blank" style="font-family: sans-serif; color: #F8FAFC; font-weight: 300;">
        Design by <span style="font-weight: 900">DЖ<span style="color: #a5b4fc;">О</span></span>
      </a>
    `;
  }
  
  // Вставляем элемент
  parentElement.insertBefore(creditLink, document.currentScript);
})();