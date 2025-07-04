Feature: Visualizar seccion de organizadores

    Scenario: Mostrar información del organizador
        Given que el usuario está viendo la descripción de un evento
        When baja a la sección de organizadores
        Then debería visualizar nombre, foto de perfil y breve descripción del organizador.