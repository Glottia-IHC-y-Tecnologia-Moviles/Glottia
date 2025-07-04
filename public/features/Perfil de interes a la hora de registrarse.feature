Feature: Perfil de interés a la hora de registrarse

    Scenario: Elección de idiomas favoritos
        Given estoy registrandome en la plataforma
        When llego a la parte de preferencias
        Then puedo elegir uno o varios idiomas que quiero practicar.

    Scenario: Selección de intereses personales
        Given estoy completando el registro
        When veo categorías como "viajes", "negocios", "cultura"
        Then puedo marcar mis intereses preferidos.

    Scenario: Recomendaciones inmediatas
        Given completé mi registro con intereses
        When entro a la plataforma de Glottia
        Then veo eventos y grupos sugeridos basados en mis elecciones.