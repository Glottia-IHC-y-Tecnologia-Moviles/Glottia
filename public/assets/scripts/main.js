const mensajes = {
    "Funcionamiento de la app": "Glottia te conecta con hablantes nativos para sesiones de práctica presenciales y virtuales. Únete a conversaciones reales y mejora tu fluidez de forma natural.",
    "Beneficios de usar Glottia": "🌟 Conexión con hablantes nativos<br>🎯 Práctica conversacional real<br>⏰ Flexibilidad de horarios<br>🌍 Comunidad global de aprendizaje",
    "Testimonios de usuarios": "💬 \"Glottia cambió mi forma de aprender idiomas. ¡Súper útil y divertida!\" - Ana G.<br><br>⭐ \"Las sesiones con nativos me dieron la confianza que necesitaba\" - Carlos M."
};

function mostrarMensaje(opcion) {
    const respuestaDiv = document.getElementById("respuesta");

    respuestaDiv.innerHTML = "Cargando información...";
    respuestaDiv.className = "respuesta loading show";

    setTimeout(() => {
        respuestaDiv.innerHTML = mensajes[opcion] || "Información no disponible.";
        respuestaDiv.className = "respuesta show";
    }, 500);
}

function volver() {
    const overlay = document.getElementById('ayudaOverlay');
    overlay.classList.remove('visible');

    const respuestaDiv = document.getElementById("respuesta");
    respuestaDiv.className = "respuesta loading show";
    respuestaDiv.innerHTML = "Regresando al menú principal...";

    setTimeout(() => {
        respuestaDiv.className = "respuesta";
        respuestaDiv.innerHTML = "";
        overlay.style.display = 'none';
    }, 500); // coincide con la transición
}

function mostrarAyuda() {
    const overlay = document.getElementById('ayudaOverlay');
    overlay.style.display = 'flex';
    void overlay.offsetWidth; // fuerza reflow
    overlay.classList.add('visible');
}

document.addEventListener('DOMContentLoaded', function () {
    // Escape limpia mensajes
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            const respuestaDiv = document.getElementById("respuesta");
            respuestaDiv.className = "respuesta";
            respuestaDiv.innerHTML = "";
        }
    });

    // Menú hamburguesa (si lo tienes)
    const menuIcon = document.querySelector('.icono-menu');
    if (menuIcon) {
        menuIcon.addEventListener('click', () => console.log('Menú toggled'));
    }
});
