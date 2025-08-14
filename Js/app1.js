// Fondo de estrellas animadas responsive
function createStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];

  function generateStars() {
    const numStars = Math.floor(window.innerWidth * window.innerHeight / 1200);
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.4 + 0.6,
        alphaChange: (Math.random() * 0.015 - 0.0075)
      });
    }
  }

  function resize() {
    // Ajusta el tamaño REAL del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
  }

  function draw() {
    ctx.fillStyle = '#0D0D0D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';

    for (let s of stars) {
      s.alpha += s.alphaChange;
      if (s.alpha < 0.3 || s.alpha > 1) s.alphaChange *= -1;

      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

window.addEventListener('DOMContentLoaded', createStars);
