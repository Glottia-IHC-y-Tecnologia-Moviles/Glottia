Feature:Acceder al perfil de otros usuarios

    Scenario: Ver perfil de un asistente
        Given que el usuario está viendo la lista de asistente u organizadores
        When hace clic sobre el nombre o foto del usuario
        Then debería dirigirse al perfil del usuario