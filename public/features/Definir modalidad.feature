Feature: Definir modalidad

    Scenario: Seleccionar la modalidad de la reunión.
        Given que el usuario está dentro del formulario de creación de Reunión
        And se dirige a la sección de “Modalidad de Reunión”
        When selecciona la modalidad entre Virtual o Presencial
        Then la modalidad escogida debe asociarse correctamente al evento.

    Scenario: El usuario no selecciona ninguna modalidad
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de “Modalidad de Reunión”
        And desea continuar con la creación de la Reunión
        Then la página le manda un mensaje donde avisa al usuario que esa sección en específico no debería estar vacía.
        And no puede continuar con la creación de la reunión.