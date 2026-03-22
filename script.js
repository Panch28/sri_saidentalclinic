/* ========================================
   SmileCraft Dental — Interactive Scripts
   Scroll reveals, counters, carousel, nav
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ─── LOADER ───
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1600);
  });
  // Fallback
  setTimeout(() => loader.classList.add('hidden'), 3000);

  // ─── NAVBAR SCROLL ───
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const ct = window.scrollY;
    if (ct > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = ct;
  }, { passive: true });

  // ─── MOBILE MENU ───
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ─── SCROLL REVEAL (Intersection Observer) ───
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't unobserve so stagger children timing works
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── ANIMATED COUNTERS ───
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        if (counter.dataset.animated) return;
        counter.dataset.animated = 'true';
        animateCounter(counter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      if (target >= 1000) {
        el.textContent = current.toLocaleString('en-IN');
      } else {
        el.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (target >= 1000) {
          el.textContent = target.toLocaleString('en-IN');
        } else {
          el.textContent = target;
        }
      }
    }
    requestAnimationFrame(update);
  }

  // ─── TESTIMONIALS CAROUSEL ───
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('.testimonials-dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;
  const totalSlides = dots.length;

  function goToSlide(index) {
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
  });

  // Auto-play
  let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);

  const slider = document.querySelector('.testimonials-slider');
  slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
  slider.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
  });

  // ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── FORM SUBMIT ───
  const form = document.getElementById('appointmentForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('.btn-primary');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Request Sent!';
    btn.style.background = 'linear-gradient(135deg, #00d4aa, #00a888)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });

  // ─── PARALLAX ON MOUSE MOVE (Hero orbs) ───
  const hero = document.getElementById('hero');
  const orb1 = document.querySelector('.hero-orb');
  const orb2 = document.querySelector('.hero-orb-2');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    requestAnimationFrame(() => {
      orb1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
      orb2.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    });
  });

  // ─── ACTIVE NAV HIGHLIGHT ───
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = '#00d4aa';
      }
    });
  }, { passive: true });

  // ─── SCROLL-FRAME TEETH ANIMATION ───
  (function initFrameAnimation() {
    const TOTAL_FRAMES = 50;
    const FRAME_PATH = 'images/frames/ezgif-frame-';  // new clean frames (no watermark)
    const canvas = document.getElementById('frameCanvas');
    if (!canvas) return; // Safety check

    const ctx = canvas.getContext('2d');
    const section = document.querySelector('.frame-scroll-section');
    const loaderEl = document.getElementById('frameLoader');
    const loaderFill = document.getElementById('frameLoaderFill');
    const loaderPercent = document.getElementById('frameLoaderPercent');
    const overlay1 = document.getElementById('frameOverlay1');
    const overlay2 = document.getElementById('frameOverlay2');
    const overlay3 = document.getElementById('frameOverlay3');
    const overlayCta = document.getElementById('frameOverlayCta');

    const images = [];
    let loadedCount = 0;
    let currentFrame = -1;
    let isReady = false;

    // Preload all frames
    function preloadFrames() {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const num = String(i).padStart(3, '0');
        img.src = `${FRAME_PATH}${num}.png`;
        img.onload = onFrameLoaded;
        img.onerror = onFrameLoaded; // count errors too so loader finishes
        images.push(img);
      }
    }

    function onFrameLoaded() {
      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      loaderFill.style.width = pct + '%';
      loaderPercent.textContent = pct + '%';

      if (loadedCount >= TOTAL_FRAMES) {
        isReady = true;
        setTimeout(() => {
          loaderEl.classList.add('hidden');
        }, 400);
        // Size canvas and draw first frame
        resizeCanvas();
        drawFrame(0);
      }
    }

    // Canvas sizing — match viewport
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }

    // Draw a specific frame index (0-based)
    function drawFrame(index) {
      if (index === currentFrame) return;
      currentFrame = index;
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;

      // Clear
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);

      // Draw image fitting canvas (object-fit: contain — no crop, full quality)
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let drawW, drawH, drawX, drawY;

      if (imgRatio > canvasRatio) {
        // Image is wider — fit width, letterbox top/bottom
        drawW = cw;
        drawH = cw / imgRatio;
        drawX = 0;
        drawY = (ch - drawH) / 2;
      } else {
        // Image is taller — fit height, pillarbox sides
        drawH = ch;
        drawW = ch * imgRatio;
        drawX = (cw - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);


    }

    // Scroll handler — map scroll position to frame index + overlays
    function onScroll() {
      if (!isReady) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      // progress: 0 at top, 1 at bottom
      const progress = Math.max(0, Math.min(1, sectionTop / sectionHeight));
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

      drawFrame(frameIndex);

      // Text overlay visibility based on progress ranges
      // Overlay 1: frames 0-20% (first ~10 frames)
      const show1 = progress >= 0.02 && progress <= 0.22;
      overlay1.classList.toggle('visible', show1);

      // Overlay 2: frames 35-60% (middle frames)
      const show2 = progress >= 0.35 && progress <= 0.60;
      overlay2.classList.toggle('visible', show2);

      // Overlay 3: frames 65-85%
      const show3 = progress >= 0.65 && progress <= 0.85;
      overlay3.classList.toggle('visible', show3);

      // CTA button: last 15% (frames 85-100%)
      const showCta = progress >= 0.88;
      overlayCta.classList.toggle('visible', showCta);
    }

    // Throttled scroll with rAF
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      resizeCanvas();
      if (currentFrame >= 0) {
        const idx = currentFrame;
        currentFrame = -1; // Force redraw
        drawFrame(idx);
      }
    });

    // Start
    preloadFrames();
  })();
});
