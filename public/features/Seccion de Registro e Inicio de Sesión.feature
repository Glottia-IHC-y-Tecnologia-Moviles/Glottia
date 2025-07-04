Feature: Sección de Registro e Inicio de Sesión

    Scenario: Botón de Registro visible
        Given estoy navegando dentro de la página de Glottia
        And deseo registrar mi usuario
        When busco dentro de las opciones que me ofrece la página
        Then veo el botón de registro en la parte superior de la página

    Scenario: Botón de Inicio de Sesión visible
        Given estoy navegando dentro de la página de Glottia
        And deseo iniciar sesión con una cuenta ya existente 
        When busco dentro de las opciones que me ofrece la página
        Then veo el botón de Inicio de Sesión en la parte superior de la página

    Scenario: Redirección correcta de Registro e Inicio de Sesión
        Given hago clic en algunas de las opciones de Inicio de Sesión o Registro
        When el sistema llega a procesar ese clic
        Then seré llevado directamente a un formulario donde llenaré los datos que sean necesarios.