Feature: Seccion de ¿Como funciona?

    Scenario: Explicación clara sobre el funcionamiento de la plataforma
        Given que estoy navegando en la plataforma de Glottia
        When llegó a la sección "¿Cómo funciona?"
        Then veo los pasos resumidos para comenzar a usar Glottia

    Scenario: Apoyo visual en la explicación
        Given qué estoy leyendo los pasos sobre el funcionamiento 
        When observó los elementos mostrados 
        Then cada paso tiene un ícono o ilustración explicativa

    Scenario: Opción para más información
        Given que veo la sección "¿Cómo funciona?"
        When quiero profundizar más
        Then encuentro un botón o enlace que diga "Saber más"