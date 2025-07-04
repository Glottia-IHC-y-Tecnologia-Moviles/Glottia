Feature:Confirmacion y publicacion del evento

    Scenario: Publicar exitosamente un evento
        Given que el usuario ha completado todos los campos requeridos
        When selecciona la opción de “Crear” dentro del formulario
        Then debería la reunión debería crearse en la plataforma
        And mostrarse en la sección de eventos disponibles