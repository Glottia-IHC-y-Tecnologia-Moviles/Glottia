Feature: Seleccion de un lugar para la reunion

    Scenario: Seleccionar un lugar de reunión.
        Given que el usuario está dentro del formulario de creación de Reunión
        And se dirige a la sección de “Lugar de Encuentro”
        When elige un lugar disponible 
        Then el lugar seleccionado debe asociarse correctamente al evento.

    Scenario: El usuario no selecciona ningún lugar de encuentro
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de “Lugar de Encuentro”
        And desea continuar con la creación de la Reunión
        Then  la página le manda un mensaje donde avisa al usuario que esa sección en específico no debería estar vacía.