//Descargar hoja de vida
const botonCV = document.getElementById('botonCV');
botonCV.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'cv.pdf';
    link.click();
});

// Menu hamburguesa
const menuToggle = document.getElementById("menu-toggle");
    const navList = document.querySelector(".navbar-menu");

    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
    });
