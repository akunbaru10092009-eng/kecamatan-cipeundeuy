//============================================================
// script.js — animasi hitung angka naik (dari 0 ke angka asli)
// Angka asli diambil dari atribut data-target di HTML
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const statValues = document.querySelectorAll('.stat-value');

  // observer: menjalankan animasi begitu elemen kelihatan di layar
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target); // cukup jalan sekali saja
      }
    });
  }, { threshold: 0.4 });

  statValues.forEach((el) => observer.observe(el));
});

function animateCount(el) {
  const target = parseFloat(el.getAttribute('data-target')) || 0;
  const isDecimal = String(target).includes('.');
  const duration = 1200; // durasi animasi dalam milidetik
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = target * progress;

    el.textContent = isDecimal
      ? current.toFixed(2)
      : Math.floor(current).toLocaleString('id-ID');

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = isDecimal
        ? target.toFixed(2)
        : target.toLocaleString('id-ID');
    }
  }
  requestAnimationFrame(tick);
}