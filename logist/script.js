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

// Welcome gate + ambient music (starts on «Продолжить»)
(function initAmbientAudio() {
  const audio = document.getElementById('ambient-audio');
  const root = document.querySelector('[data-ambient]');
  const toggle = document.getElementById('ambient-toggle');
  const gate = document.getElementById('welcome-gate');
  const okBtn = document.getElementById('welcome-ok');
  const quietBtn = document.getElementById('welcome-quiet');
  if (!audio || !toggle || !root || !gate || !okBtn || !quietBtn) return;

  const STORAGE_KEY = 'ambient-music';
  const TARGET_VOLUME = 0.28;
  let fadeTimer = null;
  let mutedByUser = false;
  let started = false;
  let playInFlight = null;
  let audioCtx = null;
  let mediaWired = false;
  let gateClosed = false;

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

  function wakeAudioContext() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      if (!audioCtx) audioCtx = new AC();
      if (!mediaWired) {
        try {
          audioCtx.createMediaElementSource(audio).connect(audioCtx.destination);
        } catch (e) {}
        mediaWired = true;
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    } catch (e) {}
  }

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
    playInFlight = null;
    mutedByUser = false;
    localStorage.setItem(STORAGE_KEY, 'on');
    fadeTo(TARGET_VOLUME, 900);
    syncUi();
  }

  function playAmbient() {
    if (mutedByUser) {
      syncUi();
      return Promise.resolve(false);
    }
    if (started && !audio.paused) {
      syncUi();
      return Promise.resolve(true);
    }
    if (playInFlight) return playInFlight;

    try {
      audio.muted = false;
      audio.volume = 0;
    } catch (e) {}

    wakeAudioContext();

    let playPromise;
    try {
      playPromise = audio.play();
    } catch (err) {
      playInFlight = null;
      syncUi();
      return Promise.resolve(false);
    }

    if (playPromise && typeof playPromise.then === 'function') {
      playInFlight = playPromise
        .then(() => {
          onStarted();
          return true;
        })
        .catch(() => {
          playInFlight = null;
          syncUi();
          return false;
        });
      return playInFlight;
    }

    onStarted();
    return Promise.resolve(true);
  }

  function stopAmbient() {
    mutedByUser = true;
    started = false;
    playInFlight = null;
    localStorage.setItem(STORAGE_KEY, 'off');
    fadeTo(0, 350);
    syncUi();
  }

  function closeGate() {
    if (gateClosed) return;
    gateClosed = true;
    gate.hidden = true;
    document.body.classList.remove('welcome-open');
    root.hidden = false;
    syncUi();
  }

  function openGate() {
    gate.hidden = false;
    document.body.classList.add('welcome-open');
    root.hidden = true;
    okBtn.focus();
  }

  okBtn.addEventListener('click', e => {
    e.preventDefault();
    mutedByUser = false;
    localStorage.setItem(STORAGE_KEY, 'on');
    playAmbient();
    closeGate();
  });

  quietBtn.addEventListener('click', e => {
    e.preventDefault();
    mutedByUser = true;
    localStorage.setItem(STORAGE_KEY, 'off');
    closeGate();
  });

  gate.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      mutedByUser = true;
      localStorage.setItem(STORAGE_KEY, 'off');
      closeGate();
    }
  });

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
        playInFlight = null;
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

  openGate();
  syncUi();
})();
