Feature: Calendario que marca los proximos eventos

    Scenario: Fechas resaltadas
        Given estoy viendo el calendario
        When existen eventos en ciertas fechas
        Then esas fechas aparecen resaltadas o marcadas.

    Scenario: Detalles al hacer clic
        Given veo una fecha resaltada
        When hago clic sobre ella
        Then se despliega un pequeño resumen del evento.

    Scenario: Vista semanal y mensual
        Given estoy en la sección del calendario
        When cambio la vista
        Then puedo elegir entre ver los eventos de la semana o del mes completo.