Feature: Seccion de Beneficios de usar Glottia

    Scenario: Ver listado de los beneficios
        Given que navego en la landing
        When llego a la sección de beneficios
        Then veo una lista de las principales ventajas de usar Glottia

    Scenario: Beneficios presentados de forma visual
        Given que observo los beneficios que brinda la plataforma
        When los miro detalladamente
        Then cada beneficio está representado con un ícono o imagen característica

    Scenario: Botón para registrarse al final de los beneficios
        Given que termino de leer los beneficios
        When me interesa registrarme
        Then encuentro un botón que me lleva al registro