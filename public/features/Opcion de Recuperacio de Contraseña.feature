Feature:Opcion de Recuperación de Contraseña

    Scenario: Enlace visible de recuperación
        Given estoy en la pantalla de login
        When no recuerdo mi contraseña
        Then veo un enlace de "¿Olvidaste tu contraseña?" justo debajo de los campos de ingreso.

    Scenario: Envío de email de recuperación
        Given hago clic en "¿Olvidaste tu contraseña?"
        When ingreso mi correo registrado
        Then recibo un email con instrucciones para cambiarla.

    Scenario: Confirmación de recuperación
        Given solicité recuperar mi contraseña
        When completo el proceso de cambio
        Then recibo un mensaje de confirmación de que fue actualizada exitosamente.