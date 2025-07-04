Feature: Registro como invitado temporal

    Scenario: Botón de "Entrar como invitado"
        Given estoy en la pantalla principal
        When no quiero registrarme aún
        Then puedo presionar "Explorar como invitado".

    Scenario: Acceso limitado para invitados
        Given entré como invitado
        When navego en eventos y reuniones
        Then puedo ver información básica pero no puedo reservar eventos.

    Scenario: Invitación a registrarme
        Given llevo un tiempo como invitado
        When intento unirse a un evento
        Then me aparece una invitación para crear una cuenta y continuar.