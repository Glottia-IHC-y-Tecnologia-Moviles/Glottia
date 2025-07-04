Feature:Especificar fecha y hora

    Scenario: Definir fecha y hora
        Given que el usuario está dentro del formulario de creación de Reunión
        And se dirige a la sección de “Fecha y Hora”
        When selecciona la fecha y la hora asignada para la reunión
        Then la información brindada debe guardarse y asociarse correctamente al evento.

    Scenario: El usuario no completa la fecha
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de “Fecha”
        And desea continuar con la creación de la Reunión
        Then  la página le manda un mensaje donde avisa al usuario que esa sección en específico no debería estar vacía.
        And no puede continuar con la creación de la reunión.

    Scenario: El usuario no completa la hora
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de “Hora”
        And desea continuar con la creación de la Reunión
        Then  la página le manda un mensaje donde avisa al usuario que esa sección en específico no debería estar vacía.
        And no puede continuar con la creación de la reunión.

    Scenario: El usuario completa la hora de forma parcial
        Given el usuario está dentro del formulario de creación de Reunión
        When el usuario selecciona solo la hora de inicio y no la de finalización
        And desea continuar con la creación de la Reunión
        Then  la página asigna la hora de finalización de manera automática a dos horas del inicio de la reunión
