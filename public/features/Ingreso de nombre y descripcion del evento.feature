Feature: Ingreso de nombre y descripción del evento

    Scenario: Ingresar nombre y descripción 
        Given que el usuario está dentro del formulario de creación de Reunión
        When completa los campos de título y descripción
        Then la información debe guardarse correctamente al enviar el formulario.

    Scenario: El usuario no ingresa los campos de nombre y descripción
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío los espacio de Nombre y Descripción
        And desea continuar con la creación de la Reunión
        Then  la página le manda un mensaje donde avisa al usuario que esas secciones no deben dejarse vacías