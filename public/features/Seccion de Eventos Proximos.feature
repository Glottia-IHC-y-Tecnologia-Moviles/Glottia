Feature: Seccion de "Eventos Próximos"

    Scenario: Mostrar eventos basados en mi ubicación geográfica
        Given introduje la ubicación en donde me encuentro actualmente
        When me dirijo dentro de la sección de “Eventos Próximos”
        Then se muestran los próximos eventos listados según mi ubicación

    Scenario: Actualizar eventos si cambio de ubicación
        Given actualizo manualmente la ubicación en la que me encuentro
        When guardo los cambios 
        Then se actualiza los eventos que están próximos a mi ubicación

    Scenario: Actualizar la lista de eventos
        Given quisiera visualizar diferentes eventos 
        When  presiono la opción de “Refrescar”
        Then se actualiza la lista de los eventos 