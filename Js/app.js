// Cambiar tema claro/oscuro
window.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  btn && btn.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('light-theme');
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      icon.style.color = '#f7c873';
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      icon.style.color = '#ffe066';
    }
  });
});
// Fondo de estrellas animadas
function createStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  // Generar estrellas
  const numStars = Math.floor(window.innerWidth * window.innerHeight / 1200);
  let stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 0.8 + 0.2,
      alpha: Math.random() * 0.4 + 0.7 // opacidad mínima 0.7, máxima 1.1
    });
  }
  function draw() {
    ctx.fillStyle = '#0D0D0D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    for (let s of stars) {
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  draw();
}
window.addEventListener('DOMContentLoaded', createStars);
