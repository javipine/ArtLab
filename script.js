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
