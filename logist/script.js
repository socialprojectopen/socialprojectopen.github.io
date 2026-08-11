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
  { selector: '.law__ready', stagger: 0 },
  { selector: '.hero__nds-head', stagger: 0 },
  { selector: '.nds__gray', stagger: 0 },
  { selector: '.nds__panel', stagger: 0.12 },
  { selector: '.nds__ready', stagger: 0 },
  { selector: '.branch-card', stagger: 0.08 },
  { selector: '.company__spot', stagger: 0 },
  { selector: '.company__split', stagger: 0 },
  { selector: '.process-card', stagger: 0.08 },
  { selector: '.video-card', stagger: 0.06 },
  { selector: '.portfolio__item', stagger: 0.05 },
  { selector: '.industries__goslog', stagger: 0 },
  { selector: '.industry-row', stagger: 0.1 },
  { selector: '.industries__ready', stagger: 0 },
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

// Mute + play helper for ambient videos
function prepareAmbientVideo(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.volume = 0;
  const play = () => video.play().catch(() => {});
  if (video.readyState >= 2) play();
  else video.addEventListener('loadeddata', play, { once: true });
}

document.querySelectorAll('video[data-auto-mute], .phone-reel__video').forEach(prepareAmbientVideo);

// Vertical phone reel: rotate portrait videos inside phone frame
(function initPhoneReel() {
  const reel = document.querySelector('[data-phone-reel]');
  if (!reel) return;

  const videos = Array.from(reel.querySelectorAll('.phone-reel__video'));
  const dotsWrap = reel.querySelector('.phone-reel__dots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!videos.length) return;

  const dots = videos.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'phone-reel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Видео ${i + 1}`);
    dotsWrap && dotsWrap.appendChild(dot);
    return dot;
  });

  let index = 0;
  let timer;

  function show(i) {
    videos[index].classList.remove('is-active');
    videos[index].pause();
    index = i;
    const next = videos[index];
    next.classList.add('is-active');
    next.currentTime = 0;
    prepareAmbientVideo(next);
    dots.forEach((dot, di) => dot.classList.toggle('is-active', di === index));
  }

  videos.forEach((video, i) => {
    prepareAmbientVideo(video);
    video.classList.toggle('is-active', i === 0);
    if (i !== 0) video.pause();
    dots[i] && dots[i].addEventListener('click', () => {
      show(i);
      if (timer) {
        clearInterval(timer);
        if (!reduceMotion) timer = setInterval(() => show((index + 1) % videos.length), 6500);
      }
    });
  });

  if (!reduceMotion && videos.length > 1) {
    timer = setInterval(() => show((index + 1) % videos.length), 6500);
  }
})();

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

// Ambient music: start on first real gesture (tap/touch). Never show "muted" on failed unlock.
(function initAmbientAudio() {
  const audio = document.getElementById('ambient-audio');
  const root = document.querySelector('[data-ambient]');
  const toggle = document.getElementById('ambient-toggle');
  if (!audio || !toggle || !root) return;

  const STORAGE_KEY = 'ambient-music';
  const TARGET_VOLUME = 0.28;
  let fadeTimer = null;
  // Only explicit user mute turns music "off"
  let mutedByUser = localStorage.getItem(STORAGE_KEY) === 'off';
  let started = false;
  let unlocking = false;

  audio.loop = true;
  audio.preload = 'auto';
  audio.setAttribute('playsinline', '');
  audio.setAttribute('webkit-playsinline', '');
  try {
    audio.muted = false;
    audio.volume = 0;
  } catch (e) {}

  try {
    audio.load();
  } catch (e) {}

  function syncUi() {
    const playing = started && !audio.paused && !mutedByUser;
    toggle.classList.toggle('is-muted', mutedByUser);
    toggle.classList.toggle('is-playing', playing);
    root.classList.toggle('is-playing', playing);
    toggle.setAttribute('aria-pressed', mutedByUser ? 'false' : 'true');
    toggle.setAttribute(
      'aria-label',
      mutedByUser ? 'Включить фоновую музыку' : 'Выключить фоновую музыку'
    );
  }

  function clearFade() {
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  }

  function fadeTo(target, ms) {
    clearFade();
    const startVol = Number(audio.volume) || 0;
    const steps = Math.max(1, Math.round(ms / 40));
    let step = 0;
    fadeTimer = setInterval(() => {
      step += 1;
      const t = step / steps;
      try {
        audio.volume = Math.max(0, Math.min(1, startVol + (target - startVol) * t));
      } catch (e) {}
      if (step >= steps) {
        clearFade();
        try {
          audio.volume = target;
        } catch (e) {}
        if (target === 0) {
          try {
            audio.pause();
          } catch (e) {}
        }
        syncUi();
      }
    }, 40);
  }

  function onStarted() {
    started = true;
    unlocking = false;
    mutedByUser = false;
    localStorage.setItem(STORAGE_KEY, 'on');
    fadeTo(TARGET_VOLUME, 900);
    removeUnlockListeners();
    syncUi();
  }

  function playAmbient() {
    if (mutedByUser) {
      syncUi();
      return Promise.resolve(false);
    }

    unlocking = true;
    try {
      audio.muted = false;
      if (!started) audio.volume = 0;
    } catch (e) {}

    let playPromise;
    try {
      // Must stay inside the user gesture call stack on mobile
      playPromise = audio.play();
    } catch (err) {
      unlocking = false;
      syncUi(); // keep note icon — do NOT mark muted
      return Promise.resolve(false);
    }

    if (playPromise && typeof playPromise.then === 'function') {
      return playPromise
        .then(() => {
          onStarted();
          return true;
        })
        .catch(() => {
          unlocking = false;
          syncUi(); // failure != mute
          return false;
        });
    }

    onStarted();
    return Promise.resolve(true);
  }

  function stopAmbient() {
    mutedByUser = true;
    started = false;
    unlocking = false;
    localStorage.setItem(STORAGE_KEY, 'off');
    fadeTo(0, 350);
    bindUnlockListeners();
    syncUi();
  }

  function tryUnlock(e) {
    if (mutedByUser || started || unlocking) return;
    if (e && e.target && (toggle === e.target || toggle.contains(e.target))) return;
    playAmbient();
  }

  // Real gestures only — scroll/wheel alone often fail media unlock on mobile
  const unlockEvents = [
    ['touchstart', { capture: true, passive: true }],
    ['touchend', { capture: true, passive: true }],
    ['pointerdown', { capture: true, passive: true }],
    ['click', { capture: true }],
    ['keydown', { capture: true }],
  ];

  function removeUnlockListeners() {
    unlockEvents.forEach(([type, opts]) => {
      document.removeEventListener(type, tryUnlock, opts);
      window.removeEventListener(type, tryUnlock, opts);
    });
  }

  function bindUnlockListeners() {
    removeUnlockListeners();
    unlockEvents.forEach(([type, opts]) => {
      document.addEventListener(type, tryUnlock, opts);
      window.addEventListener(type, tryUnlock, opts);
    });
  }

  toggle.addEventListener(
    'click',
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!mutedByUser && started && !audio.paused) {
        stopAmbient();
      } else {
        mutedByUser = false;
        localStorage.setItem(STORAGE_KEY, 'on');
        started = false;
        playAmbient();
      }
    },
    true
  );

  document.addEventListener('visibilitychange', () => {
    if (mutedByUser || !started) return;
    if (document.hidden) fadeTo(0.08, 250);
    else if (!audio.paused) fadeTo(TARGET_VOLUME, 500);
  });

  window.addEventListener('pageshow', () => {
    if (!mutedByUser && started && audio.paused) playAmbient();
  });

  syncUi();
  if (!mutedByUser) bindUnlockListeners();
})();
