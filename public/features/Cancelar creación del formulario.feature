Feature: Cancelar creacion del formulario

    Scenario: Cancelar creación de reunión
        Given que el usuario desea cancelar la reunión
        When selecciona la opción de “Cancelar” dentro del formulario
        Then debería salir del formulario de creación de eventos
        And debería mandarlo a la página que estaba anteriormente