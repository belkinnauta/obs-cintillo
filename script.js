const lowerThird = document.getElementById('lower-third');
const primaryText = document.getElementById('primary-text');
const secondaryText = document.getElementById('secondary-text');

// Función para mostrar el cintillo con nuevos datos
function mostrarCintillo(titulo, subtitulo, duracionSegundos = 6) {
    primaryText.textContent = titulo;
    secondaryText.textContent = subtitulo;
    
    // Activar animación de entrada
    lowerThird.classList.add('visible');

    // Ocultar automáticamente después del tiempo indicado
    setTimeout(() => {
        lowerThird.classList.remove('visible');
    }, duracionSegundos * 1000);
}

// Ejemplo de prueba automática al cargar en OBS (puedes borrarlo o adaptarlo)
setTimeout(() => {
    mostrarCintillo("Carlos Mendoza", "Transmisión en Vivo • Plaza de la República", 7);
}, 2000);