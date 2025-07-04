Feature: Seccion de Eventos Simultáneos

    Scenario: Detección de eventos a la misma hora
        Given estoy navegando por eventos
        When dos o más eventos coinciden en fecha y hora
        Then se agrupan y se indica "Eventos simultáneos".

    Scenario: Vista detallada
        Given veo varios eventos simultáneos
        When hago clic en el grupo
        Then puedo ver los detalles de cada uno para comparar.

    Scenario: Elección de prioridad
        Given hay varios eventos a la misma hora
        When selecciono uno como "favorito"
        Then el sistema lo marca como mi prioridad en el calendario.