(function () {
  var toggle = document.querySelector('.menu-toggle');
  var wrap = document.querySelector('.header-nav-wrap');
  if (!toggle || !wrap) return;

  function openMenu() {
    wrap.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    wrap.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    if (wrap.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  wrap.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && wrap.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();
