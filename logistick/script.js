// Page load
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
});

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// Header on scroll
const header = document.querySelector('.header');

function updateHeader() {
  if (window.scrollY > 20) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Scroll reveal
const revealGroups = [
  { selector: '.section-header', stagger: 0 },
  { selector: '.law__conditions', stagger: 0.08 },
  { selector: '.law__panel', stagger: 0 },
  { selector: '.law__basis-full', stagger: 0 },
  { selector: '.law__doc-card', stagger: 0.1 },
  { selector: '.law__risks', stagger: 0 },
  { selector: '.law__tax', stagger: 0 },
  { selector: '.law__ready', stagger: 0 },
  { selector: '.compliance-card', stagger: 0.12 },
  { selector: '.visual-block__grid > .image-slot', class: 'reveal reveal--left', stagger: 0 },
  { selector: '.visual-block__grid > .visual-block__text', class: 'reveal reveal--right', stagger: 0.15 },
  { selector: '.capability-item', stagger: 0.1 },
  { selector: '.readiness__bar', stagger: 0 },
  { selector: '.readiness-card', stagger: 0.1 },
  { selector: '.trust__content', class: 'reveal reveal--left', stagger: 0 },
  { selector: '.trust .image-slot', class: 'reveal reveal--right', stagger: 0.15 },
  { selector: '.footer__inner', class: 'reveal reveal--scale', stagger: 0 },
];

const revealElements = [];

revealGroups.forEach(group => {
  document.querySelectorAll(group.selector).forEach((el, index) => {
    el.classList.add(...(group.class || 'reveal').split(' '));
    if (group.stagger) {
      el.style.transitionDelay = `${index * group.stagger}s`;
    }
    revealElements.push(el);
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// Smooth anchor offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Modal
const modals = document.querySelectorAll('.modal');

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    openModal(trigger.getAttribute('data-modal'));
  });
});

modals.forEach(modal => {
  modal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', () => closeModal(modal));
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modals.forEach(modal => {
      if (modal.classList.contains('is-open')) closeModal(modal);
    });
  }
});
