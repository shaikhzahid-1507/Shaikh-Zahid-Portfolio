// ============ Footer year ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const mobileTabs = document.getElementById('mobileTabs');
navToggle.addEventListener('click', () => {
  const isOpen = mobileTabs.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
mobileTabs.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileTabs.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ Reading progress bar ============
const progressBar = document.getElementById('progressBar');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ============ Active nav tab on scroll ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('[data-tab]');

const setActive = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ============ Rotating hero word ============
const rotatingEl = document.getElementById('rotatingWord');
const words = ['data', 'code', 'models', 'curiosity'];
let wordIndex = 0;

function rotateWord() {
  if (prefersReducedMotion) return;
  wordIndex = (wordIndex + 1) % words.length;
  rotatingEl.style.opacity = 0;
  setTimeout(() => {
    rotatingEl.textContent = words[wordIndex];
    rotatingEl.style.opacity = 1;
  }, 250);
}

if (!prefersReducedMotion) {
  rotatingEl.style.transition = 'opacity 0.25s ease';
  setInterval(rotateWord, 2200);
}

// ============ Stat count-up on scroll into view ============
const statRow = document.getElementById('statRow');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;
  const tiles = statRow.querySelectorAll('.stat-value');
  tiles.forEach(tile => {
    const target = parseFloat(tile.dataset.count);
    const decimals = parseInt(tile.dataset.decimals || '0', 10);
    const suffix = tile.dataset.suffix || '';
    if (prefersReducedMotion) {
      tile.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    const duration = 1100;
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      tile.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
      else tile.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  });
}

if ('IntersectionObserver' in window && statRow) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  statObserver.observe(statRow);
} else {
  animateStats();
}

// ============ Placeholder links notice ============
document.querySelectorAll('[data-placeholder-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    console.info('Add a real URL for this link in index.html (look for data-placeholder-link).');
  });
});

// ============ Contact form -> mailto ============
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:shaikhzahiduddin@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = 'Opening your email client…';
});
