Feature:Asignar nivel asignado para la reunión

    Scenario: Elegir nivel del evento
        Given que el usuario está dentro del formulario de creación de Reunión
        And se dirige a la sección de “Nivel de la Reunión”
        When selecciona uno de los niveles establecidos
        Then se asigna el nivel a la reunión 
        And forma parte de los detalles públicos de la reunión (Descripción)

    Scenario: El usuario no completa la sección de “Nivel” 
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de “Nivel de la Reunión”
        And desea continuar con la creación de la Reunión
        Then la página deja en blanco el espacio de Nivel de la Reunión, dejando esta información dentro de los detalles de la reunión.