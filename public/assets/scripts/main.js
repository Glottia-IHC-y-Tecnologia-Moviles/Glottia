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

    // Menú hamburguesa dinámico solo en responsive
    const nav = document.querySelector('.topheader');
    const menu = nav ? nav.querySelector('ul.menu-horizontal') : null;
    let hamburgerBtn = null;

    function createHamburger() {
        if (hamburgerBtn) return;
        hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger';
        hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('type', 'button');
        hamburgerBtn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
        // Posiciona el botón hamburguesa a la derecha del nav
        hamburgerBtn.style.marginLeft = 'auto';
        hamburgerBtn.style.order = '2';
        // Asegura que el nav sea flex
        nav.style.display = 'flex';
        nav.style.alignItems = 'center';
        nav.style.justifyContent = 'space-between';
        // Inserta el botón después del menú (al final del nav)
        nav.appendChild(hamburgerBtn);

        hamburgerBtn.addEventListener('click', function () {
            menu.classList.toggle('open');
            const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !expanded);
        });
        // Cierra el menú al hacer click en un enlace o botón
        menu.querySelectorAll('a, button').forEach(function (el) {
            el.addEventListener('click', function () {
                if (window.innerWidth <= 900) {
                    menu.classList.remove('open');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    function removeHamburger() {
        if (hamburgerBtn) {
            hamburgerBtn.remove();
            hamburgerBtn = null;
            if (menu) menu.classList.remove('open');
        }
    }

    function handleResponsiveMenu() {
        if (!nav || !menu) return;
        if (window.innerWidth <= 900) {
            createHamburger();
        } else {
            removeHamburger();
        }
    }

    window.addEventListener('resize', handleResponsiveMenu);
    handleResponsiveMenu();
});

