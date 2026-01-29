/**
 * Мобильное меню (бургер)
 */

document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.getElementById('burgerMenu');
  const navMenu = document.getElementById('navMenu');
  
  if (burgerMenu && navMenu) {
    // Открытие/закрытие меню
    burgerMenu.addEventListener('click', function() {
      burgerMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = navMenu.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnBurger = burgerMenu.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnBurger && navMenu.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Закрытие меню при изменении размера окна (если перешли на десктоп)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});