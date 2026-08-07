// ===== Shree Karni Marbles — site scripts =====

// 3D Opening Intro (plays once per browser session)
const preloader = document.getElementById('preloader');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (sessionStorage.getItem('skm_intro_played') || reducedMotion) {
  preloader.classList.add('skip');
} else {
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('opening');
      sessionStorage.setItem('skm_intro_played', '1');
      setTimeout(() => preloader.classList.add('skip'), 1200);
    }, 1500);
  });
}

// Navbar scroll state
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Subtle hero parallax on mouse move (desktop only)
const heroBg = document.getElementById('heroBg');
if (window.matchMedia('(pointer:fine)').matches && heroBg) {
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Enquiry form -> WhatsApp
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = enquiryForm.name.value.trim();
    const phone = enquiryForm.phone.value.trim();
    const message = enquiryForm.message.value.trim();
    const text = `Hi, I'm ${name} (${phone}).%0A${message ? encodeURIComponent(message) : "I'd like to enquire about your marble collection."}`;
    window.open(`https://wa.me/919079326153?text=${text}`, '_blank');
  });
}
