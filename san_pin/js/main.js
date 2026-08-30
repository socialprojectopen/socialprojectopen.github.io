document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });
});

const burger = document.getElementById("burger");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Открыть меню");
    });
  });
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle("header--scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealGroups = [
  { selector: ".section-header", stagger: 0 },
  { selector: ".present", stagger: 0 },
  { selector: ".nds__gray", stagger: 0 },
  { selector: ".nds__visual", stagger: 0 },
  { selector: ".nds__ready", stagger: 0 },
  { selector: ".nds__panel", stagger: 0.12 },
  { selector: ".etrn__fact", stagger: 0.08 },
  { selector: ".etrn__split", stagger: 0 },
  { selector: ".license__hero", stagger: 0 },
  { selector: ".license__card", stagger: 0.08 },
  { selector: ".industry-row", stagger: 0.1 },
  { selector: ".industries__ready", stagger: 0 },
  { selector: ".branch-card", stagger: 0.08 },
  { selector: ".company__spot", stagger: 0 },
  { selector: ".company__split", stagger: 0 },
  { selector: ".process-card", stagger: 0.08 },
  { selector: ".video-card", stagger: 0.06 },
  { selector: ".portfolio__item", stagger: 0.05 },
  { selector: ".law__panel", stagger: 0 },
  { selector: ".law__sept", stagger: 0 },
  { selector: ".law__act", stagger: 0.08 },
  { selector: ".law__doc-card", stagger: 0.1 },
  { selector: ".law__basis-full", stagger: 0 },
  { selector: ".law__ready", stagger: 0 },
  { selector: ".compliance-card", stagger: 0.12 },
  { selector: ".visual-block__grid > .image-slot", class: "reveal reveal--left", stagger: 0 },
  { selector: ".visual-block__grid > .visual-block__text", class: "reveal reveal--right", stagger: 0.15 },
  { selector: ".capability-item", stagger: 0.1 },
  { selector: ".trust__content", class: "reveal reveal--left", stagger: 0 },
  { selector: ".trust .image-slot", class: "reveal reveal--right", stagger: 0.15 },
  { selector: ".footer__inner", class: "reveal reveal--scale", stagger: 0 },
];

const revealElements = [];

revealGroups.forEach((group) => {
  document.querySelectorAll(group.selector).forEach((el, index) => {
    el.classList.add(...(group.class || "reveal").split(" "));
    if (group.stagger) {
      el.style.transitionDelay = `${index * group.stagger}s`;
    }
    revealElements.push(el);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

function muteVideo(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("autoplay", "");
  try {
    video.volume = 0;
  } catch (e) {}
}

function isActiveReelVideo(video) {
  if (!video.classList.contains("phone-reel__video")) return true;
  return video.classList.contains("is-active");
}

function isOnScreen(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 80 && rect.top < window.innerHeight - 40;
}

function tryPlayMuted(video) {
  if (!video || !isActiveReelVideo(video)) return Promise.resolve(false);
  muteVideo(video);
  const play = () => video.play().catch(() => false);
  if (video.readyState >= 2) return play();
  return new Promise((resolve) => {
    const go = () => play().then(resolve);
    video.addEventListener("loadeddata", go, { once: true });
    video.addEventListener("canplay", go, { once: true });
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const autoplayVideos = Array.from(
  document.querySelectorAll("video[data-autoplay-mute], video[data-auto-mute], .phone-reel__video")
);

function playVisibleMuted() {
  if (reduceMotion || document.hidden) return;
  autoplayVideos.forEach((video) => {
    if (isOnScreen(video) && isActiveReelVideo(video)) tryPlayMuted(video);
    else video.pause();
  });
}

autoplayVideos.forEach((video) => {
  muteVideo(video);
  if (reduceMotion) return;

  const vis = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !document.hidden) tryPlayMuted(video);
        else video.pause();
      });
    },
    { threshold: 0.2, rootMargin: "40px 0px" }
  );
  vis.observe(video);
});

if (!reduceMotion) {
  playVisibleMuted();
  document.addEventListener("pointerdown", playVisibleMuted, { once: true, passive: true });
  document.addEventListener("keydown", playVisibleMuted, { once: true });
  window.addEventListener("pageshow", playVisibleMuted);
  document.addEventListener("visibilitychange", playVisibleMuted);
}

(function initPresent() {
  const stage = document.querySelector("[data-present]");
  if (!stage) return;
  const video = stage.querySelector("video");
  const playBtn = stage.querySelector(".present__play");
  if (!video || !playBtn) return;

  muteVideo(video);
  video.loop = true;

  function sync() {
    const playing = !video.paused && !video.ended;
    stage.classList.toggle("is-playing", playing);
    playBtn.setAttribute("aria-hidden", playing ? "true" : "false");
  }

  function playPresent() {
    muteVideo(video);
    return video.play().catch(() => {});
  }

  playBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    playPresent();
  });
  video.addEventListener("click", () => {
    muteVideo(video);
    if (video.paused) playPresent();
    else video.pause();
  });
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    playPresent();
  });

  if (!reduceMotion) playPresent();
  sync();
})();

(function initPhoneReel() {
  const reel = document.querySelector("[data-phone-reel]");
  if (!reel) return;

  const videos = Array.from(reel.querySelectorAll(".phone-reel__video"));
  const dotsWrap = reel.querySelector(".phone-reel__dots");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!videos.length) return;

  const dots = videos.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "phone-reel__dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Видео ${i + 1}`);
    dotsWrap && dotsWrap.appendChild(dot);
    return dot;
  });

  let index = 0;
  let timer;

  function show(i) {
    videos[index].classList.remove("is-active");
    videos[index].pause();
    index = i;
    const next = videos[index];
    next.classList.add("is-active");
    next.currentTime = 0;
    tryPlayMuted(next);
    dots.forEach((dot, di) => dot.classList.toggle("is-active", di === index));
  }

  videos.forEach((video, i) => {
    tryPlayMuted(video);
    video.classList.toggle("is-active", i === 0);
    if (i !== 0) video.pause();
    dots[i] &&
      dots[i].addEventListener("click", () => {
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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({ top, behavior: "smooth" });
  });
});
