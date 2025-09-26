//Descargar hoja de vida
const botonCV = document.getElementById('botonCV');
botonCV.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'CV LAURA_MONSALVE (2).pdf';
    link.download = 'CV LAURA_MONSALVE (2).pdf';
    link.click();
});

// Funcionalidad de cambio de tema
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const root = document.documentElement;
    
    // Cargar tema guardado o usar oscuro por defecto
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    function setTheme(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            themeIcon.className = 'bi bi-moon-fill';
        } else {
            root.removeAttribute('data-theme');
            themeIcon.className = 'bi bi-sun-fill';
        }
        localStorage.setItem('theme', theme);
    }
    
    function toggleTheme() {
        const currentTheme = root.hasAttribute('data-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    
    themeToggle?.addEventListener('click', toggleTheme);
})();

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Indicador de progreso de scroll
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        scrollProgress.style.transform = `scaleX(${scrollPercent})`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Animaciones en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Agregar clase base de animación
            element.classList.add('animated');
            
            // Determinar qué tipo de animación aplicar
            if (element.classList.contains('contenedor-titulo')) {
                // Animar los spans del título con stagger, pero excluir monsalve-span
                const spans = element.querySelectorAll('span');
                spans.forEach((span, index) => {
                    // Solo animar si tiene una clase stagger Y no es monsalve-span
                    if ((span.classList.contains('stagger-1') || 
                        span.classList.contains('stagger-2') || 
                        span.classList.contains('stagger-4')) && 
                        !span.classList.contains('monsalve-span')) {
                        setTimeout(() => {
                            span.classList.add('fade-in-up');
                        }, index * 200);
                    }
                    // Monsalve Velasquez se mantiene sin animación
                });
            } else if (element.classList.contains('contenedor-canvas')) {
                element.classList.add('fade-in-right');
            } else if (element.classList.contains('profile-pic')) {
                element.classList.add('scale-in');
            } else if (element.classList.contains('about-text')) {
                element.classList.add('fade-in-left');
            } else if (element.classList.contains('project-card')) {
                if (element.classList.contains('reverse')) {
                    element.classList.add('fade-in-left');
                } else {
                    element.classList.add('fade-in-right');
                }
            } else {
                element.classList.add('fade-in-up');
            }
            
            // Dejar de observar este elemento
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observar todos los elementos con animación
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Contador animado para estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 16);
    });
}

// Observer especial para estadísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar la sección de estadísticas
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efecto de tipeo para el texto principal
function typeWriter() {
    const texts = [
        "Full Stack Java Developer",
        "QA Automation Engineer", 
        "Frontend Developer",
        "Backend Developer",
        "Problem Solver"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    
    function type() {
        if (!typingElement) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 100 : 150;
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pausa al final del texto
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Iniciar el efecto después de un pequeño delay
    setTimeout(type, 2000);
}

// Iniciar el efecto de tipeo cuando la página carga
window.addEventListener('load', typeWriter);

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
