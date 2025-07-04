Feature:Registro rapido en un solo paso

    Scenario: Formulario breve
        Given estoy en la sección de registro
        When veo los campos obligatorios
        Then solo me solicitan nombre, correo y contraseña.

    Scenario: Registro sin validaciones extensas
        Given completé los campos requeridos
        When envío el formulario
        Then no me piden más datos opcionales para poder entrar a la plataforma.

    Scenario: Confirmación instantánea
        Given terminé de llenar el registro rápido
        When presiono "Crear cuenta"
        Then recibo un mensaje de cuenta creada satisfactoriamente.