Feature:Regresar a la pantalla principal desde cualquier sección

    Scenario: Navegar de regreso a la página principal desde otra sección
        Given que el usuario se encuentra en una sección distinta de la plataforma
        When hace clic en el logo de Glottia
        Then debería ser redirigido a la pantalla principal con el calendario y los eventos.

    Scenario: El usuario hace clic en el logo desde la página principal
        Given que el usuario ya se encuentra en la página principal
        When hace clic en el logo de Glottia
        Then la página debería recargarse y mostrar la información más actualizada.