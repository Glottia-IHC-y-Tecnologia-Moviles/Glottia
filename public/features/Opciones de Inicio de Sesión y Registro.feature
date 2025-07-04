Feature: Opciones de Incio de Sesión y Registro

    Scenario: Opción de iniciar sesión con Google
        Given estoy en la sección de inicio de sesión
        When selecciono "Iniciar sesión con Google"
        Then seré redirigido a la autenticación de Google y accedo rápidamente.

    Scenario: Opción de iniciar sesión con Facebook
        Given estoy en la página de inicio de sesión
        When selecciono "Iniciar sesión con Facebook"
        Then autorizo mi cuenta de Facebook y accedo a la plataforma.

    Scenario: Mostrar alternativas visibles
        Given quiero registrarme o iniciar sesión
        When veo las opciones disponibles
        Then aparecen claramente íconos o botones de Google, Facebook y correo tradicional.

