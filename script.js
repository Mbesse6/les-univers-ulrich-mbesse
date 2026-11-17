const languageButton = document.querySelector('.language');
const translatable = document.querySelectorAll('[data-fr][data-en]');
function setLanguage(language) {
  const english = language === 'en';
  document.documentElement.lang = english ? 'en' : 'fr';
  translatable.forEach((element) => {
    if (element.hasAttribute('data-html-fr')) {
      element.innerHTML = english ? element.dataset.htmlEn : element.dataset.htmlFr;
    } else {
      element.textContent = english ? element.dataset.en : element.dataset.fr;
    }
  });
  document.querySelectorAll('[data-alt-fr][data-alt-en]').forEach((image) => {
    image.alt = english ? image.dataset.altEn : image.dataset.altFr;
  });
  document.querySelectorAll('[data-aria-fr][data-aria-en]').forEach((element) => {
    element.setAttribute('aria-label', english ? element.dataset.ariaEn : element.dataset.ariaFr);
  });
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    carousel.setAttribute('aria-roledescription', english ? 'carousel' : 'carrousel');
  });
  languageButton.classList.toggle('is-en', english);
  languageButton.setAttribute('aria-pressed', String(english));
  languageButton.setAttribute('aria-label', english ? 'Passer en français' : 'Switch language to English');
  document.title = english ? "The Worlds of Ulrich Mbesse" : "Les Univers d'Ulrich Mbesse";
  document.querySelectorAll('.carousel-toggle').forEach((button) => {
    const paused = button.getAttribute('aria-pressed') === 'true';
    const state = paused ? 'Play' : 'Pause';
    const languageSuffix = english ? 'En' : 'Fr';
    const key = `label${state}${languageSuffix}`;
    const text = button.querySelector('.carousel-toggle-text');
    if (text) text.textContent = button.dataset[key] || state;
    button.setAttribute('aria-label', paused ? (english ? 'Resume carousel autoplay' : 'Reprendre le défilement automatique') : (english ? 'Pause carousel autoplay' : 'Mettre le carrousel en pause'));
  });
  document.querySelectorAll('[data-carousel] .carousel-dot').forEach((button, index, all) => {
    button.setAttribute('aria-label', english ? `Show photo ${index + 1} of ${all.length}` : `Afficher la photo ${index + 1} sur ${all.length}`);
  });
}
languageButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'fr' ? 'en' : 'fr'));
document.querySelector('#year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  '.section-kicker, .intro-grid, .portrait-wide, .traits, .journey-head, .career-photo, .route-line, .journey-note, .project-card, .worlds-head, .world-card, .featured .feature-copy, .feature-photo, .episode-link, .featured .media-placeholder, .featured .audio-placeholder, .contact-grid, .contact-choice, .showreel-heading, .photo-carousel, .cv-panel'
);
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach((element) => {
    element.setAttribute('data-reveal', '');
    revealObserver.observe(element);
  });

  const sectionLinks = [...document.querySelectorAll('.desktop-nav a')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  ['personne', 'parcours', 'univers', 'contact'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

const progressLine = document.querySelector('.reading-progress span');
let progressPending = false;
function updateProgress() {
  if (progressPending) return;
  progressPending = true;
  requestAnimationFrame(() => {
    const page = document.documentElement;
    const distance = Math.max(page.scrollHeight - window.innerHeight, 1);
    const percent = Math.min(100, Math.max(0, window.scrollY / distance * 100));
    progressLine.style.width = `${percent}%`;
    progressPending = false;
  });
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = carousel.querySelector('.carousel-dots');
  const counter = carousel.querySelector('.carousel-count');
  const toggle = carousel.querySelector('.carousel-toggle');
  const previous = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  if (!track || !slides.length || !dots || !toggle || !previous || !next) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let paused = reduceMotion.matches;
  let intervalId = null;
  const dotButtons = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'carousel-dot';
    button.setAttribute('aria-label', document.documentElement.lang === 'en' ? `Show photo ${index + 1} of ${slides.length}` : `Afficher la photo ${index + 1} sur ${slides.length}`);
    button.addEventListener('click', () => { show(index); restart(); });
    dots.append(button);
    return button;
  });

  function updateToggle() {
    const text = toggle.querySelector('.carousel-toggle-text');
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    const key = paused ? 'play' : 'pause';
    if (text) text.textContent = toggle.dataset[`label${key[0].toUpperCase()}${key.slice(1)}${lang[0].toUpperCase()}${lang.slice(1)}`] || (paused ? 'Play' : 'Pause');
    toggle.setAttribute('aria-label', paused ? (lang === 'en' ? 'Resume carousel autoplay' : 'Reprendre le défilement automatique') : (lang === 'en' ? 'Pause carousel autoplay' : 'Mettre le carrousel en pause'));
    toggle.setAttribute('aria-pressed', String(paused));
    previous.setAttribute('aria-label', lang === 'en' ? 'Previous photo' : 'Photo précédente');
    next.setAttribute('aria-label', lang === 'en' ? 'Next photo' : 'Photo suivante');
    track.setAttribute('aria-live', paused ? 'polite' : 'off');
    toggle.querySelector('[aria-hidden="true"]').textContent = paused ? '▶' : 'Ⅱ';
  }

  function show(index) {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translate3d(-${activeIndex * 100}%, 0, 0)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dotButtons[slideIndex].classList.toggle('is-active', active);
      dotButtons[slideIndex].setAttribute('aria-current', active ? 'true' : 'false');
    });
    counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  function stopTimer() {
    window.clearInterval(intervalId);
    intervalId = null;
  }

  function startTimer() {
    stopTimer();
    if (paused || document.hidden || carousel.matches(':hover') || carousel.contains(document.activeElement)) return;
    intervalId = window.setInterval(() => show(activeIndex + 1), 5600);
  }

  function restart() {
    startTimer();
  }

  previous.addEventListener('click', () => { show(activeIndex - 1); restart(); });
  next.addEventListener('click', () => { show(activeIndex + 1); restart(); });
  toggle.addEventListener('click', () => { paused = !paused; updateToggle(); restart(); });
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('focusin', stopTimer);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) window.requestAnimationFrame(startTimer);
  });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(activeIndex - 1); restart(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(activeIndex + 1); restart(); }
  });
  document.addEventListener('visibilitychange', startTimer);
  reduceMotion.addEventListener('change', (event) => {
    if (event.matches) { paused = true; updateToggle(); }
    startTimer();
  });

  show(0);
  updateToggle();
  startTimer();
});
