// Fondo de estrellas animadas responsive
function createStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];

  function getThemeColors() {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    return {
      starColor: getComputedStyle(root).getPropertyValue('--star-color').trim() || '#fff',
      backgroundColor: getComputedStyle(root).getPropertyValue('--star-bg').trim() || '#0D0D0D'
    };
  }

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
    const colors = getThemeColors();
    
    ctx.fillStyle = colors.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors.starColor;

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
