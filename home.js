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
