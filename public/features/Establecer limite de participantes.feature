Feature: Establecer limite de participantes

    Scenario: Ingresar límite de participantes
        Given que el usuario está dentro del formulario de creación de Reunión
        And se dirige a la sección de “Participantes”
        When ingresa un número límite de participantes
        Then se asigna un límite a la reunión
        And la plataforma debería impedir inscripciones una vez alcanzado el límite

    Scenario: El usuario no completa la sección de “Límite de participantes” 
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de “Participantes”
        And desea continuar con la creación de la Reunión
        Then  la página asigna la sección de Participantes al mínimo siendo de 3 participantes.