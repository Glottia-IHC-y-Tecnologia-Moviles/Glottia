document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de login cargado');
    
    // Verificar si ya hay sesión activa
    checkExistingSession();
    
    // Obtener elementos del formulario
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('rememberMe');
    const errorMessage = document.getElementById('errorMessage');
    const loginButton = document.getElementById('loginButton');

    // Cargar datos recordados si existen
    loadRememberedData();

    // Event listener para el formulario
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Verificar si hay sesión activa
    function checkExistingSession() {
        // Esperar a que UserStorage esté disponible
        setTimeout(() => {
            if (window.UserStorage && window.UserStorage.isLoggedIn()) {
                console.log('Usuario ya autenticado, redirigiendo...');
                window.location.href = 'home.html';
            }
        }, 100);
    }

    // Cargar datos recordados
    function loadRememberedData() {
        const rememberedEmail = localStorage.getItem('glottia_remembered_email');
        if (rememberedEmail && emailInput) {
            emailInput.value = rememberedEmail;
            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
        }
    }

    // Manejar el login
    async function handleLogin(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;

        // Validaciones básicas
        if (!email) {
            showError('Por favor ingresa tu email');
            return;
        }

        if (!password) {
            showError('Por favor ingresa tu contraseña');
            return;
        }

        // Verificar que UserStorage esté disponible
        if (!window.UserStorage) {
            showError('Sistema de autenticación no disponible. Por favor, recarga la página.');
            return;
        }

        try {
            setLoading(true);
            hideError();

            console.log('Intentando autenticar usuario:', email);
            
            // Intentar autenticar usuario
            const user = window.UserStorage.loginUser(email, password);
            
            console.log('Usuario autenticado exitosamente:', user);
            
            // Manejar "recordar usuario"
            if (remember) {
                localStorage.setItem('glottia_remembered_email', email);
            } else {
                localStorage.removeItem('glottia_remembered_email');
            }
            
            // Mostrar mensaje de éxito
            showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
            
            // Redirigir después de un breve delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);

        } catch (error) {
            console.error('Error en login:', error);
            showError(error.message);
            setLoading(false);
        }
    }

    // Mostrar error
    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            errorMessage.style.backgroundColor = '#fee';
            errorMessage.style.color = '#c53030';
        }
    }

    // Mostrar éxito
    function showSuccess(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            errorMessage.style.backgroundColor = '#e6ffee';
            errorMessage.style.color = '#137c4c';
        }
    }

    // Ocultar mensajes
    function hideError() {
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }

    // Manejar estado de carga
    function setLoading(isLoading) {
        if (loginButton) {
            loginButton.disabled = isLoading;
            loginButton.textContent = isLoading ? 'Iniciando sesión...' : 'Iniciar sesión';
        }
    }

    // Limpiar errores cuando el usuario empiece a escribir
    [emailInput, passwordInput].forEach(input => {
        if (input) {
            input.addEventListener('input', hideError);
        }
    });

    // Debug: Mostrar usuarios registrados en consola
    setTimeout(() => {
        if (window.UserStorage) {
            console.log('Usuarios registrados:', window.UserStorage.getAllUsers());
            console.log('Para testing, puedes usar alguno de estos usuarios si existen');
        }
    }, 1000);
});