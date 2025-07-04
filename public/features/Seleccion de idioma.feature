Feature: Seleccion del idioma

    Scenario: Seleccionar un idioma
        Given que el usuario está dentro del formulario de creación de Reunión
        When elige un idioma dentro del menú desplegable
        Then el idioma seleccionado debe asociarse correctamente al evento.

    Scenario: El usuario no selecciona ningún idioma
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de Idiomas
        And desea continuar con la creación de la Reunión
        Then  la página le manda un mensaje donde avisa al usuario que esa sección en específico no debería estar vacía.