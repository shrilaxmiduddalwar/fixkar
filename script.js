// script.js
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Download Modal ---------- */
  const popup = document.getElementById('popup');
  const downloadBtns = document.querySelectorAll('#downloadBtn, #heroDownload');
  const closePopup = document.getElementById('closePopup');
  const notifyForm = document.getElementById('notifyForm');
  const notifyMsg = document.getElementById('notifyMsg');
  const notifyEmail = document.getElementById('notifyEmail');

  function openPopup() {
    popup.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    popup.setAttribute('aria-hidden', 'true');
  }
  downloadBtns.forEach(b => b && b.addEventListener('click', openPopup));
  closePopup && closePopup.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === popup) closeModal(); });

  notifyForm && notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (notifyEmail && notifyEmail.value || '').trim();
    if (!email || !email.includes('@')) {
      notifyMsg.textContent = 'Please enter a valid email.';
      notifyMsg.style.color = '#c0392b';
      return;
    }
    // fake submit - in real app you'd POST to server
    notifyMsg.textContent = 'Thanks! We will notify you when app is live.';
    notifyMsg.style.color = 'green';
    notifyEmail.value = '';
    setTimeout(() => { closeModal(); notifyMsg.textContent = ''; }, 1600);
  });

  /* ---------- Privacy Carousel ---------- */
  const track = document.getElementById('carouselTrack');
  const cards = track ? Array.from(track.children) : [];
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('dots');
  let index = 0;
  let autoplay = true;
  let timer = null;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Go to slide ${i+1}`);
      btn.addEventListener('click', () => { goTo(i); pauseAuto(); });
      if (i === 0) btn.classList.add('active');
      dotsWrap.appendChild(btn);
    });
  }

  function updateDots() {
    if (!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = ((i % cards.length) + cards.length) % cards.length;
    // compute translation: place the card at index 0 of viewport (leftmost)
    const cardWidth = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 14);
    const offset = cardWidth * index;
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function prev() { goTo(index - 1); pauseAuto(); }
  function next() { goTo(index + 1); pauseAuto(); }

  function startAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => { if (autoplay) next(); }, 4500);
  }
  function pauseAuto() { autoplay = false; clearInterval(timer); setTimeout(() => { autoplay = true; startAuto(); }, 6000); }

  if (cards.length) {
    renderDots();
    startAuto();
    // pause on hover
    track.addEventListener('mouseenter', () => { autoplay = false; });
    track.addEventListener('mouseleave', () => { autoplay = true; });
    prevBtn && prevBtn.addEventListener('click', prev);
    nextBtn && nextBtn.addEventListener('click', next);
    // initialize
    setTimeout(() => goTo(0), 100);
    window.addEventListener('resize', () => { goTo(index); });
  }

  /* ---------- Card pointer tilt effect ---------- */
  const flashCards = document.querySelectorAll('.flash-card');
  flashCards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) - 0.5;
      const py = (y / r.height) - 0.5;
      const rotX = (-py * 6).toFixed(2);
      const rotY = (px * 8).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  /* Accessibility: keyboard support for carousel */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') closeModal();
  });

});
// EmailJS integration
// 1. Sign up at https://www.emailjs.com/
// 2. Add your SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY here
// 3. In template, configure to send email to yourself with user email in message

notifyForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = notifyEmail.value.trim();
  if (!email) return;

  emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
    user_email: email
  }, "PUBLIC_KEY")
  .then(() => {
    notifyMsg.textContent = "Thanks! Confirmation email sent.";
    notifyMsg.style.color = "green";
    notifyEmail.value = "";
  })
  .catch(() => {
    notifyMsg.textContent = "Error sending email. Try again later.";
    notifyMsg.style.color = "red";
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const notifyForm  = document.getElementById('notifyForm');
  const notifyEmail = document.getElementById('notifyEmail');
  const notifyMsg   = document.getElementById('notifyMsg');

  // === Your EmailJS keys ===
  const PUBLIC_KEY  = "81zp2WP4_59xTlJmG";
  const SERVICE_ID  = "service_m5x66ob";
  const TEMPLATE_ID = "template_5vjq4li";
  // ==========================

  // Init EmailJS
  emailjs.init({ publicKey: PUBLIC_KEY });

  // Handle form submit
  notifyForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (notifyEmail?.value || '').trim();

    if (!email || !email.includes('@')) {
      notifyMsg.textContent = "Please enter a valid email.";
      notifyMsg.style.color = "red";
      return;
    }

    notifyMsg.textContent = "Sending confirmation...";
    notifyMsg.style.color = "gray";

    const time = new Date().toLocaleString();

    // These params must match variables in your template
    const params = {
      user_email: email,                  
      user_name: "",                      
      app_name: "FixKar",
      support_email: "fixkar9@gmail.com", 
      time
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params);
      notifyMsg.textContent = "Thanks! Confirmation email sent.";
      notifyMsg.style.color = "green";
      notifyEmail.value = "";
    } catch (err) {
      console.error(err);
      notifyMsg.textContent = "Error sending email. Try again later.";
      notifyMsg.style.color = "red";
    }
  });
});
