Feature: Ver perfil de organizador del evento

    Scenario: Visualizar información del organizador
        Given que el usuario está viendo un evento
        When hace clic en el nombre del organizador
        Then debería ser redirigido al perfil del organizador con su descripción e idiomas que practica

    Scenario: El organizador tiene eventos activos
        Given que el usuario está en el perfil del organizador
        When navega por su perfil
        Then debería ver otros eventos organizados por esa persona.