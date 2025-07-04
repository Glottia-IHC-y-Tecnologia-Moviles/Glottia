Feature:Ver imagen referencial del evento

    Scenario: Mostrar imagen del evento
        Given que el usuario accede al detalle de un evento
        When la información del evento se carga
        Then debería visualizarse una imagen referencial en la parte superior

    Scenario: Evento sin imagen disponible
        Given que el evento no tiene una imagen asociada
        When el usuario accede al evento
        Then debería mostrarse una imagen genérica o un mensaje “Imagen disponible” o una imagen por defecto.