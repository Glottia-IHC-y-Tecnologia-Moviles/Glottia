Feature:Marcar eventos como favoritos

    Scenario: Marcar un evento como favorito
        Given que el usuario visualiza un evento en la lista
        When hace clic en el ícono de favorito
        Then el evento debería guardarse en su lista de favoritos

    Scenario: Ver la lista de eventos favoritos
        Given que el usuario ha marcado eventos como favoritos
        When accede a su sección de favoritos
        Then debería ver una lista con todos los eventos guardados