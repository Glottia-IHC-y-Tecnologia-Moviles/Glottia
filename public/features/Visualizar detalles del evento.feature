Feature: Visualizar detalles del evento

    Scenario: Mostrar imagen del evento
        Given que el usuario accede al detalle de un evento
        When se muestra la vista completa
        Then deberían mostrar la fecha, hora, ubicación, idioma y nivel sugerido del evento.