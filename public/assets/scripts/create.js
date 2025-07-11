const input = document.getElementById('imagen');
const preview = document.getElementById('preview');

input.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.style.backgroundImage = `url('${e.target.result}')`;
        }
        reader.readAsDataURL(file);
    }
});

const formReunion = document.querySelector('form[name="formReunion"]');

formReunion.addEventListener("submit", (event) => {
    const nombre = formReunion.elements["nombreReunion"]?.value.trim();
    const descripcion = formReunion.elements["desc"]?.value.trim();
    const idioma = formReunion.elements["idioma"]?.value;
    const virtual = document.getElementById("virtual")?.checked;
    const presencial = document.getElementById("presencial")?.checked;
    const lugar = formReunion.elements["lugar"]?.value.trim();
    const fechaHora = formReunion.elements["fechaHora"]?.value;
    const limite = formReunion.elements["limite"]?.value;
    const nivel = formReunion.elements["levelIdiom"]?.value;

    // Validación
    if (
        !nombre ||
        !descripcion ||
        !idioma ||
        (!virtual && !presencial) ||
        !lugar ||
        !fechaHora ||
        !limite ||
        !nivel
    ) {
        event.preventDefault();
        return;
    }

    // Si todo está bien
    event.preventDefault();

    formReunion.reset();
    limpiarImagen();

    window.location.href = './home.html';
});

function limpiarImagen() {
    const preview = document.getElementById("preview");
    if (preview) {
        preview.style.backgroundImage = "";
        if (preview.tagName === "IMG") {
            preview.src = "";
        }
    }
}

const virtualCheckbox = document.getElementById("virtual");
const presencialCheckbox = document.getElementById("presencial");
const seccionLugar = document.getElementById("seccionLugar");

function actualizarLugar() {
    const inputLugar = document.getElementById("lugar");
    if (virtualCheckbox.checked && !presencialCheckbox.checked) {
        // Solo virtual está marcado → mostrar y autocompletar
        seccionLugar.style.display = "block";
        if (inputLugar) {
            inputLugar.value = "Reunión virtual";
            inputLugar.readOnly = true;
            inputLugar.style.background = "#f5f5f5";
        }
    } else {
        // Presencial está marcado (o ambos) → mostrar editable
        seccionLugar.style.display = "block";
        if (inputLugar) {
            inputLugar.value = "";
            inputLugar.readOnly = false;
            inputLugar.style.background = "";
        }
    }
}

// Escuchar cambios en ambos checkboxes
virtualCheckbox.addEventListener("change", actualizarLugar);
presencialCheckbox.addEventListener("change", actualizarLugar);

// Ejecutar al cargar por si ya hay uno marcado
window.addEventListener("DOMContentLoaded", actualizarLugar);