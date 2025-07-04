Feature: Añadir imagen referecial

    Scenario: Subir una imagen del evento
        Given que el usuario está dentro del formulario de creación de Reunión
        And se dirige a la sección de “Foto”
        When selecciona una imagen para la portada
        Then se asigna la imagen a la reunión

    Scenario: El usuario no completa la sección de “Foto” 
        Given el usuario está dentro del formulario de creación de Reunión
        When deja vacío la sección de “Foto”
        And desea continuar con la creación de la Reunión
        Then la página asigna una imagen genérica a la reunión