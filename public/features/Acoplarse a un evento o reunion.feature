Feature:Acoplarse a un evento o reunión

    Scenario: Usuario se une a un evento
        Given que el usuario está viendo el detalle del evento
        When hace clic en el botón “Unirme”
        Then debería agregarse a la lista de asistentes
        And recibe un mensaje de confirmación

    Scenario: Evento lleno
        Given que el evento ya alcanzó el límite de participaciones
        When el usuario intenta unirse
        Then debería mostrarse un mensaje de “Cupo lleno”