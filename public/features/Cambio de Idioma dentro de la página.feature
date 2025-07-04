Feature: Cambio de Idioma dentro de la página

    Scenario: Cambiar el idioma a español
        Given estoy dentro de la página de Glottia
        And deseo cambiar el idioma de la página
        When selecciono la opción de idioma en la parte superior de la página
        And selecciona el idioma “Español”
        Then la página cambiará su contenido al español

    Scenario: Cambiar el idioma a inglés
        Given estoy dentro de la página de Glottia
        And deseo cambiar el idioma de la página
        When selecciono la opción de idioma en la parte superior de la página
        And selecciona el idioma “Inglés”
        Then la página cambiará su contenido en inglés

    Scenario: Mantener el idioma seleccionado
        Given que estoy dentro de la página de Glottia
        And he cambiado el idioma con anterioridad
        When recargo la página
        Then el idioma seleccionado anteriormente permanece igual dentro de la página.