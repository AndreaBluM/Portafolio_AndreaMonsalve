const botonCV = document.getElementById('botonCV');
botonCV.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'cv.pdf';
    link.click();
});