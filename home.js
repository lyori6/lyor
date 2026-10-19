// lyori.com home page behavior.
(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Hairline under the header once the page scrolls.
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Long reviews start clamped with a toggle; short ones show in full.
  document.querySelectorAll('.review').forEach((review) => {
    const text = review.querySelector('.review-text');
    if (!text) return;
    review.classList.add('is-clamped');
    if (text.scrollHeight - text.clientHeight < 4) {
      review.classList.remove('is-clamped');
      return;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'review-more';
    button.textContent = 'Read more';
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const clamped = review.classList.toggle('is-clamped');
      button.textContent = clamped ? 'Read more' : 'Read less';
      button.setAttribute('aria-expanded', String(!clamped));
    });
    review.querySelector('.review-text').after(button);
  });

  // Reviews gallery: arrow buttons and a progress bar over a native scroller.
  const track = document.getElementById('reviews-track');
  if (track) {
    const buttons = document.querySelectorAll('.gallery-btn');
    const bar = document.querySelector('.gallery-progress span');
    const step = () => {
      const card = track.querySelector('.review');
      return card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const visible = track.clientWidth / track.scrollWidth;
      const progress = max > 0 ? visible + (1 - visible) * (track.scrollLeft / max) : 1;
      if (bar) bar.style.setProperty('--progress', progress.toFixed(3));
      buttons.forEach((button) => {
        button.disabled = button.dataset.dir === '-1' ? track.scrollLeft < 4 : track.scrollLeft > max - 4;
      });
    };
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        track.scrollBy({ left: step() * Number(button.dataset.dir), behavior: 'smooth' });
      });
    });
    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        track.scrollBy({ left: step() * (event.key === 'ArrowRight' ? 1 : -1), behavior: 'smooth' });
      }
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Motion with GSAP: an intro that plays once, light reveals that play once,
  // and a slow band tied to scroll. Skipped for reduced motion; if GSAP never
  // loads, a timeout in the head un-hides the intro and nothing else is hidden.
  const root = document.documentElement;
  const start = () => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger) {
      root.classList.remove('intro');
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      // One quiet rhythm for the whole page: short, decelerating, small moves.
      const ease = 'power3.out';

      // Intro, Apple style: the headline comes into focus as one piece with a
      // soft blur and a small rise, then the rest fades in beneath it.
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .set('[data-intro]', { visibility: 'visible' })
        .from('.hero-hello, .hero-title', { autoAlpha: 0, y: 10, filter: 'blur(8px)', duration: 1.1, stagger: 0.08, clearProps: 'filter' })
        .from('.hero-sub, .hero-actions', { autoAlpha: 0, y: 6, duration: 0.8 }, 0.45)
        .from('.hero-quote, .band', { autoAlpha: 0, duration: 0.9 }, 0.6);
      root.classList.remove('intro');

      // Sections fade up once as they enter, in small staggered batches.
      const reveal = (targets, vars = {}) => {
        gsap.set(targets, { autoAlpha: 0, y: vars.y ?? 12 });
        ScrollTrigger.batch(targets, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            autoAlpha: 1, y: 0, duration: 0.6, ease, stagger: vars.stagger ?? 0.05, overwrite: true,
          }),
        });
      };
      reveal('.section-title, .contact-title', { y: 10 });
      reveal('.prose p, .contact-intro > p, .contact-links li, .contact-form');
      reveal('.job', { y: 8, stagger: 0.04 });
      reveal('.case', { y: 16, stagger: 0.08 });
      reveal('.project');
      // The review gallery comes in as one piece; animating cards inside a
      // sideways scroller made them arrive out of order.
      gsap.from('.gallery-nav, .reviews, .gallery-progress, .reviews-more', {
        autoAlpha: 0,
        y: 12,
        duration: 0.6,
        ease,
        stagger: 0.05,
        scrollTrigger: { trigger: '#testimonials', start: 'top 75%', once: true },
      });

      // Rolling band: a slow drift tied to scroll, left going down, right going up.
      gsap.fromTo('.band-track', { xPercent: 0 }, {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: '.band', start: 'top bottom', end: 'bottom top', scrub: 0.5 },
      });
    });

    media.add('(prefers-reduced-motion: reduce)', () => {
      root.classList.remove('intro');
    });
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
  } else {
    window.addEventListener('load', start);
  }

  // Copy email.
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
  });

  // Contact form, posts to the existing Cloudflare Worker.
  const form = document.getElementById('contact-form');
  if (!form) return;
  const endpoint = 'https://lyori-contact.lyori6ux.workers.dev/';
  const emailInput = document.getElementById('email-address');
  const emailError = document.getElementById('email-error');
  const feedback = document.getElementById('form-feedback');
  const submit = form.querySelector('button[type="submit"]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setFeedback = (message, ok) => {
    feedback.textContent = message;
    feedback.classList.toggle('is-success', Boolean(ok));
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setFeedback('');

    const fullName = form.fullName.value.trim();
    const email = emailInput.value.trim();
    const message = form.message.value.trim();

    if (!emailPattern.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.focus();
      return;
    }
    emailError.textContent = '';
    emailInput.removeAttribute('aria-invalid');

    if (!fullName || !message) {
      setFeedback('Please add your name and a short message.');
      return;
    }

    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = 'Sending...';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ fullName, email, message }),
      });
      const result = response.ok ? await response.json() : null;
      if (result && result.status === 'success') {
        form.reset();
        setFeedback('Thanks! Your message is on its way. I will get back to you soon.', true);
      } else {
        setFeedback((result && result.message) || 'Something went wrong. Please email hello@lyori.com instead.');
      }
    } catch (error) {
      setFeedback('Something went wrong. Please email hello@lyori.com instead.');
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  });
})();
