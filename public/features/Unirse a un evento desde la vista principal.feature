Feature:Unirse a un evento desde la vista principal

    Scenario: Unirse exitosamente a un evento
        Given que el usuario visualiza un evento en la página principal
        When se hace clic en el botón “Unirse”
        Then debería añadirse automáticamente a la lista de asistentes

    Scenario: El evento ya alcanzó el límite de participantes
        Given que el usuario intenta unirse a un evento
        When el evento ya está lleno
        Then debería mostrarse un mensaje como “Evento completo” o “Este evento ya no tiene cupos disponibles”