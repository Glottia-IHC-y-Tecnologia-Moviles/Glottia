Feature:Visualizar tipo de evento

    Scenario #1: Mostrar idioma y modalidad del evento
        Given que el usuario accede a un evento
        When se carga el detalle
        Then debería mostrarse el idioma del evento y la modalidad que abarcará esa reunión.

