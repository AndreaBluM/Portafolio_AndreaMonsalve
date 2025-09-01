//Descargar hoja de vida
const botonCV = document.getElementById('botonCV');
botonCV.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'cv.pdf';
    link.click();
});

(function () {
    const toggleBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('navbar-menu');

    function setOpen(isOpen) {
      menu.classList.toggle('active', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(isOpen));
    }

    // Toggle al pulsar el icono
    toggleBtn?.addEventListener('click', () => setOpen(!menu.classList.contains('active')));

    // Cerrar al hacer click en cualquier enlace del menú
    menu?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    // (Opcional) recalcular top si cambias la altura del nav dinámicamente
    // const nav = document.querySelector('nav');
    // const ro = new ResizeObserver(() => {
    //   const h = nav.getBoundingClientRect().height;
    //   document.documentElement.style.setProperty('--nav-h', h + 'px');
    // });
    // ro.observe(nav);
  })();
