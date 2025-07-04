Feature:Opcion de ver contraseña al escribirla

    Scenario: Icono de mostrar/ocultar contraseña
        Given estoy escribiendo mi contraseña
        When hago clic en el ícono de "ojo"
        Then puedo ver temporalmente mi contraseña.

    Scenario: Alternar visibilidad fácilmente
        Given estoy viendo mi contraseña
        When vuelvo a presionar el ícono
        Then la contraseña se vuelve a ocultar.