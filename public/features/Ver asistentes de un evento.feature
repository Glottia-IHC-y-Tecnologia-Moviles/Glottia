Feature:Ver asistentes de un evento

    Scenario: Mostrar lista de asistente confirmados
        Given que el usuario visualiza los detalles del evento
        When visualiza la sección “Asistentes”
        Then debería ver una lista de los asistentes registrados con su nombre y apellidos.