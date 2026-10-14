// Typewriter: types the name on every load, cursor keeps blinking after
const tw = document.querySelector('.tw');
if (tw) {
  const full = tw.dataset.text;
  const typed = tw.querySelector('.tw-typed');
  const rest = tw.querySelector('.tw-rest');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { tw.classList.add('go', 'done'); }
  else {
    let i = 0;
    typed.textContent = ''; rest.textContent = full; tw.classList.add('go');
    const step = () => {
      i++;
      typed.textContent = full.slice(0, i);
      rest.textContent = full.slice(i);
      if (i < full.length) {
        const ch = full[i - 1];
        setTimeout(step, ch === '\n' ? 320 : 95 + Math.random() * 70);
      } else {
        tw.classList.add('done');
      }
    };
    setTimeout(step, 450);
  }
}

// Mobile menu
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
if (burger) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); })
  );
}

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Home page: highlight the nav link for the section in view
const spyLinks = document.querySelectorAll('.nav-links a[data-spy]');
if (spyLinks.length) {
  const sections = [...spyLinks].map(a => document.getElementById(a.dataset.spy));
  const update = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0];
    sections.forEach(s => { if (s && s.offsetTop <= y) current = s; });
    spyLinks.forEach(a => a.classList.toggle('active', a.dataset.spy === current.id));
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Contact form: sends the message straight to Gospel's inbox
document.querySelectorAll('.contact-form').forEach(form => {
  const note = form.querySelector('.form-note');
  const btn = form.querySelector('button[type="submit"]');
  const btnHTML = btn.innerHTML;
  const say = (msg, kind) => { note.textContent = msg; note.dataset.kind = kind || ''; };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get('name') || '').trim(), email = (d.get('email') || '').trim(), msg = (d.get('message') || '').trim();
    if (!name || !email || !msg) return say('Please fill in all three fields.', 'err');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say('That email doesn\'t look right.', 'err');
    if (d.get('_honey')) return; // bots fill the hidden field
    btn.disabled = true; btn.textContent = 'SENDING…'; say('');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message: msg, _replyto: email,
          _subject: `New portfolio message from ${name}`, _template: 'table', _captcha: 'false' })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === 'false') {
        const m = data.message || '';
        if (/activat/i.test(m)) throw new Error('This form is being set up. Please email me at robertgospel09@gmail.com for now.');
        throw new Error(m || 'failed');
      }
      form.reset();
      say('Message sent. I\'ll get back to you soon.', 'ok');
    } catch (err) {
      console.warn('Contact form:', err.message);
      say(/set up/.test(err.message) ? err.message : 'Couldn\'t send right now. Email me at robertgospel09@gmail.com instead.', 'err');
    } finally {
      btn.disabled = false; btn.innerHTML = btnHTML;
    }
  });
});

// Click a case study image to view it full size
const zooms = document.querySelectorAll('.zoom');
if (zooms.length) {
  const lb = document.createElement('div');
  lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<button class="lightbox-close" aria-label="Close">CLOSE ✕</button><img alt="">';
  document.body.appendChild(lb);
  const big = lb.querySelector('img');
  const close = () => { lb.classList.remove('open'); document.body.classList.remove('lb-open'); };
  zooms.forEach(z => z.addEventListener('click', () => {
    big.src = z.dataset.full; big.alt = z.querySelector('img').alt;
    lb.scrollTop = 0; lb.classList.add('open'); document.body.classList.add('lb-open');
    lb.querySelector('.lightbox-close').focus();
  }));
  lb.addEventListener('click', e => { if (e.target === lb || e.target === big || e.target.classList.contains('lightbox-close')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
