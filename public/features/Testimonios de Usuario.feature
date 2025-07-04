Feature: Testimonios de Usuario

    Scenario: Mostrar testimonios visibles
        Given que navego en la plataforma de Glottia
        When llego a la sección de testimonios
        Then veo citas de usuarios con su nombre y foto

    Scenario: Testimonios auténticos y variados
        Given que leo los testimonios
        When paso de uno a otro
        Then veo diferentes idiomas y niveles de usuarios representados

    Scenario: Acceso a más testimonios
        Given que estoy interesado en más experiencias
        When hago clic en un enlace o botón
        Then puedo acceder a más historias de usuarios satisfechos