Feature:Acceso al apartado de creación de reunión

    Scenario: Acceso al apartado de ”Crear Reunión” 
        Given que el usuario ha iniciado sesión de manera satisfactoria
        When hace clic sobre el botón de “Crear Reunión”
        Then debería redirigir al apartado de creación de una reunión
        And el usuario podrá visualizar un formulario que deberá rellenar si desea crear una reunión.