/**
 * Аккордеон для дополнительных услуг и других секций
 */

document.addEventListener('DOMContentLoaded', function() {
  // Инициализация аккордеонов
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Закрываем все аккордеоны
        accordionItems.forEach(accItem => {
          accItem.classList.remove('active');
        });
        
        // Открываем текущий, если он был закрыт
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
  
  // Инициализация табов для географии
  const countryTabs = document.querySelectorAll('.country-tab');
  const countryContents = document.querySelectorAll('.country-content');
  
  countryTabs.forEach((tab) => {
    tab.addEventListener('click', function() {
      const countryId = tab.getAttribute('data-country');
      
      // Убираем активный класс у всех табов и контента
      countryTabs.forEach(t => t.classList.remove('active'));
      countryContents.forEach(c => c.classList.remove('active'));
      
      // Добавляем активный класс к выбранному табу и контенту
      tab.classList.add('active');
      const targetContent = document.getElementById(countryId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
});