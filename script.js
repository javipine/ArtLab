const dropZone = document.getElementById('drop-zone');
const printOverlay = document.getElementById('user-print');
const placeholder = document.getElementById('placeholder-text');

// Prevenir comportamiento por defecto del navegador
['dragover', 'drop'].forEach(evt => {
    dropZone.addEventListener(evt, e => e.preventDefault());
});

// Resaltar zona al arrastrar
dropZone.addEventListener('dragover', () => dropZone.style.borderColor = '#000');
dropZone.addEventListener('dragleave', () => dropZone.style.borderColor = '#ccc');

// Manejar la caída del archivo
dropZone.addEventListener('drop', (e) => {
    dropZone.style.borderColor = '#ccc';
    const file = e.dataTransfer.files[0];
    aplicarImagen(file);
});

function aplicarImagen(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            printOverlay.style.backgroundImage = `url('${event.target.result}')`;
            placeholder.innerText = ""; // Quitar el texto
        };
        reader.readAsDataURL(file);
    }
}
document.getElementById('btn-descargar').addEventListener('click', () => {
    const areaCaptura = document.getElementById('drop-zone');

    // Usamos html2canvas para renderizar el div como imagen
    html2canvas(areaCaptura, {
        useCORS: true, // Permite cargar imágenes externas si las hubiera
        backgroundColor: null // Mantiene la transparencia si el fondo es vacío
    }).then(canvas => {
        // Creamos un link temporal para la descarga
        const enlace = document.createElement('a');
        enlace.download = 'mi-diseno-personalizado.png';
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
    });
});
const toggleSwitch = document.querySelector('#checkbox');

toggleSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
});

// Comprobar si el usuario ya tenía una preferencia guardada
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
// Añade esta función al final de tu script.js
function seleccionarPredefinido(url) {
    const printOverlay = document.getElementById('user-print');
    const placeholder = document.getElementById('placeholder-text');
    
    printOverlay.style.backgroundImage = `url('${url}')`;
    placeholder.innerText = ""; // Limpia el texto instructivo
}
