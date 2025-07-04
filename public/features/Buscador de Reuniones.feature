Feature: Buscador de Reuniones

    Scenario: Búsqueda por zona
        Given estoy en la sección de buscar reuniones
        When escribo el nombre de una zona cercana
        Then se muestra las diferentes reuniones disponibles 

    Scenario: Búsqueda por fecha
        Given ingreso una fecha en el buscador
        When presiono el botón de “Buscar” 
        Then se listan las reuniones que estén cerca a la fecha seleccionada

    Scenario: Búsqueda por idioma
        Given ingreso a la opción de filtros en el apartado de Idiomas
        And selecciono el idioma preferido
        When presiono el botón de “Buscar”
        Then se muestran las diferentes reuniones que están adaptadas a ese idioma. 