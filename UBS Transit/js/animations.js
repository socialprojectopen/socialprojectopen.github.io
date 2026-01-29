/**
 * Плавное появление элементов при загрузке страницы
 */

document.addEventListener('DOMContentLoaded', function() {
  // Анимация для header
  const header = document.querySelector('.header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      header.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    }, 50);
  }

  // Анимация для hero секции
  const heroElements = document.querySelectorAll('.hero h1, .hero p');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Анимация для карточек
  const cards = document.querySelectorAll('.card, .service-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 300 + index * 100);
  });

  // Анимация для секций
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    observer.observe(section);
  });

  // Анимация для формы
  const calcForm = document.querySelector('.calc-form');
  if (calcForm) {
    calcForm.style.opacity = '0';
    calcForm.style.transform = 'translateY(30px)';
    setTimeout(() => {
      calcForm.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      calcForm.style.opacity = '1';
      calcForm.style.transform = 'translateY(0)';
    }, 500);
  }

  // Анимация для заголовков секций
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach((title, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    observer.observe(title);
  });

  // Анимация для элементов преимуществ
  const advantageItems = document.querySelectorAll('.advantage-item');
  advantageItems.forEach((item, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateX(-30px)';
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    observer.observe(item);
  });

  // Анимация для отзывов
  const reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach((card, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    observer.observe(card);
  });

  // Анимация для контактных элементов
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 200 + index * 150);
  });
});