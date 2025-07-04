Feature: Filtrar eventos por idioma

    Scenario: Filtrar eventos por idioma seleccionado
        Given que el usuario está en la página principal
        When selecciona un idioma desde el filtro de idiomas.
        Then debería ver solo los eventos disponibles para ese idioma

    Scenario: El usuario selecciona un idioma sin eventos
        Given que el usuario selecciona un idioma desde el filtro
        When no hay eventos disponibles para ese idioma.
        Then debería mostrarse un mensaje como “No hay eventos disponibles en este idioma” o similares.