/* =============================================
   COLISSEUM - Interactive Scripts
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

  // ===== PARTICLES =====
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = (2 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      p.style.animationDelay = Math.random() * 20 + 's';
      p.style.animationDuration = (15 + Math.random() * 10) + 's';
      particlesContainer.appendChild(p);
    }
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#torneo') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ===== STAGGER CHILDREN =====
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, i * 120);
        });
      }
    });
  }, { threshold: 0.1 });
  staggerContainers.forEach(c => {
    Array.from(c.children).forEach(child => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px)';
      child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    staggerObserver.observe(c);
  });

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix, 2000);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, target, suffix, duration) {
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.round(current).toLocaleString() + suffix;
      }
    }, 16);
  }

  // ===== FLIP CARDS (MOBILE TAP) =====
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.querySelectorAll('.service-card-flip').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.service-card-flip.flipped').forEach(c => {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

  // ===== TORNEO: DISPONIBLE SLOTS =====
  document.querySelectorAll('.participante-slot.disponible').forEach(slot => {
    slot.addEventListener('click', () => {
      const slotNum = slot.querySelector('.slot-number').textContent;
      window.open(
        'https://wa.me/584241389348?text=' +
        encodeURIComponent('¡Hola! Quiero inscribirme en el torneo MK11 Ultimate. ' + slotNum),
        '_blank'
      );
    });
  });

  // ===== TORNEO MODAL =====
  const torneoModal = document.getElementById('torneoModal');
  const closeTorneo = document.getElementById('closeTorneo');
  const btnOpenTorneo = document.getElementById('btnOpenTorneo');

  const openModal = (e) => {
    if(e) e.preventDefault();
    if(e) e.stopPropagation();
    if (torneoModal) {
      torneoModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (torneoModal) {
      torneoModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (btnOpenTorneo) {
    btnOpenTorneo.addEventListener('click', openModal);
  }

  if (closeTorneo) {
    closeTorneo.addEventListener('click', closeModal);
  }

  if (torneoModal) {
    torneoModal.addEventListener('click', (e) => {
      if (e.target === torneoModal) closeModal();
    });
  }

  // Handle Navbar links to #torneo
  document.querySelectorAll('a[href="#torneo"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
      // Close mobile menu if open
      const mobileNav = document.getElementById('mobileNav');
      if (mobileNav) mobileNav.classList.remove('open');
    });
  });

  // ===== NAVBAR ACTIVE LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'var(--primary-400)' : '';
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => activeLinkObserver.observe(s));

});
