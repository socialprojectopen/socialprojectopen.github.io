/**
 * UBS Transit — мобильное меню и базовое поведение
 */
(function () {
  'use strict';

  var burger = document.querySelector('.burger');
  var navMobile = document.querySelector('.nav-mobile');
  var overlay = document.querySelector('.overlay');
  var body = document.body;

  function openMenu() {
    if (burger) burger.classList.add('is-open');
    if (navMobile) navMobile.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    if (body) body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (burger) burger.classList.remove('is-open');
    if (navMobile) navMobile.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    if (body) body.style.overflow = '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      if (burger.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Закрытие при клике по ссылке в мобильном меню
  if (navMobile) {
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }
})();

/**
 * Модальные окна
 */
(function () {
  'use strict';

  function openModal(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.is-open').forEach(function (m) {
      m.classList.remove('is-open');
    });
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(btn.getAttribute('data-modal-open'));
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var id = btn.getAttribute('data-modal-close');
      if (id) closeModal(id);
      else {
        var overlay = btn.closest('.modal-overlay');
        if (overlay) overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
  });
})();

/**
 * Галерея — лайтбокс (страница О нас)
 */
(function () {
  'use strict';

  var lightbox = document.getElementById('gallery-lightbox');
  var lightboxImg = lightbox && lightbox.querySelector('.gallery-lightbox__img');
  var lightboxClose = lightbox && lightbox.querySelector('.gallery-lightbox__close');

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery-src]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var src = btn.getAttribute('data-gallery-src');
      if (src) openLightbox(src);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', function (e) {
      e.preventDefault();
      closeLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
