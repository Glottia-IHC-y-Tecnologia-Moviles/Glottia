Feature: Seccion de Ayuda al usuario

    Scenario: Acceso rápido a la ayuda
        Given navego dentro de la plataforma de Glottia
        And necesito ayuda sobre un tópico 
        When presiono el botón de “Ayuda”
        Then  seré dirigido a una sección de preguntas frecuentes y asistencia

    Scenario: Contacto con soporte
        Given  necesito ayuda sobre un tópico
        And la sección de preguntas frecuentes no ayuda mucho
        When solicito ayuda al soporte técnico
        Then se envía una solicitud de ayuda del Soporte Técnico 

    Scenario: Buscador de Ayuda
        Given  estoy dentro de la sección de ayuda 
        When  escribo una duda en el buscador de la misma
        Then  obtengo posibles soluciones o sugerencias sobre el problema que estoy experimentando en ese momento.