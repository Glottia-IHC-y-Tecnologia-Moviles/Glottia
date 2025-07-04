Feature: Sección para descargar la Aplicación Móvil de Glottia

    Scenario: Promoción de la app
        Given que navego en la plataforma
        When llego a la sección de la app en el footer
        Then veo una invitación para descargarla en Android o iOS

    Scenario: Enlaces directos a tiendas
        Given que estoy en la sección de descarga
        When veo los botones de App Store o Google Play
        Then al hacer clic soy llevado a la tienda correspondiente