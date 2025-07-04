Feature:Opcion de mantener Cuenta Iniciada

Scenario #1: Casilla de "Mantener sesión iniciada"
        Given estoy en la página de inicio de sesión
        When veo la opción "Mantener sesión iniciada"
        Then puedo seleccionarla antes de ingresar mis datos.

    Scenario: Sesión activa en dispositivo confiable
        Given seleccioné "Mantener sesión iniciada"
        When regreso a la página después de un tiempo
        Then sigo conectado sin necesidad de ingresar mi correo y contraseña nuevamente.

    Scenario: Cierre de sesión manual
        Given tengo la sesión mantenida activa
        When decido salir manualmente
        Then puedo cerrar sesión de manera fácil desde el menú principal.