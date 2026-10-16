// lyori.com home page behavior. Blog pages keep using script.js.
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
    const text = review.querySelector('.review-text p');
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
  // and a rolling band tied to scroll. Skipped for reduced motion; if GSAP never
  // loads, a timeout in the head un-hides the intro and nothing else is hidden.
  const root = document.documentElement;
  const start = () => {
    const { gsap, ScrollTrigger, SplitText } = window;
    if (!gsap || !ScrollTrigger || !SplitText) {
      root.classList.remove('intro');
      return;
    }
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ease = 'expo.out';

      // Intro: the headline rises line by line out of a mask, then the rest settles in.
      SplitText.create('.hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          const tl = gsap.timeline({ defaults: { ease } });
          tl.set('[data-intro]', { visibility: 'visible' })
            .from('.hero-hello', { autoAlpha: 0, y: 12, duration: 0.9 })
            .from(self.lines, { yPercent: 105, duration: 1.4, stagger: 0.12 }, 0.1)
            .from('.hero-sub, .hero-actions', { autoAlpha: 0, y: 18, duration: 1.1, stagger: 0.08 }, 0.55)
            .from('.hero-quote', { autoAlpha: 0, y: 32, scale: 0.97, rotate: -1.5, transformOrigin: '50% 100%', duration: 1.4 }, 0.7);
          root.classList.remove('intro');
          return tl;
        },
      });

      // Section titles rise out of a mask as they enter.
      gsap.utils.toArray('.section-title, .contact-title').forEach((title) => {
        SplitText.create(title, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.2,
              ease,
              stagger: 0.1,
              scrollTrigger: { trigger: title, start: 'top 88%', once: true },
            });
          },
        });
      });

      // Everything else fades up once, in small staggered batches.
      const reveal = (targets, vars = {}) => {
        gsap.set(targets, { autoAlpha: 0, y: vars.y ?? 24, x: vars.x ?? 0 });
        ScrollTrigger.batch(targets, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            autoAlpha: 1, y: 0, x: 0, duration: vars.duration ?? 1, ease, stagger: vars.stagger ?? 0.07, overwrite: true,
          }),
        });
      };
      reveal('.prose p, .contact-intro > p, .contact-links li, .contact-form', { stagger: 0.08 });
      reveal('.job', { y: 16, stagger: 0.04, duration: 0.9 });
      reveal('.case', { y: 36, stagger: 0.12 });
      reveal('.project', { y: 20 });
      reveal('.review', { x: 48, y: 0, stagger: 0.08, duration: 1.2 });

      // Rolling band: drifts left as you scroll down, right as you scroll up.
      gsap.fromTo('.band-track', { xPercent: 0 }, {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: { trigger: '.band', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });

      // Case study screenshots ease out of a slight zoom as they pass.
      gsap.utils.toArray('.case-image img').forEach((img) => {
        gsap.fromTo(img, { scale: 1.1 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: img, start: 'top bottom', end: 'center center', scrub: 0.6 },
        });
      });

      // The hero quote drifts up a little slower than the page.
      gsap.to('.hero-quote', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
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
