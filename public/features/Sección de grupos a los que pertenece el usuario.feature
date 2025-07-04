Feature: Sección de grupos a los que pertenece el usuario

    Scenario: Mostrar lista de Grupos de Usuario
        Given que el usuario ha iniciado sesión
        When accede a la sección “Mis Grupos”
        Then debería ver una lista con los nombres de los grupos a los que pertenece.

    Scenario: El usuario accede a los detalles de un grupo
        Given que el usuario ve la lista de sus grupos
        When selecciona un grupo específico
        Then debería visualizar información detallada del grupo y los próximos encuentros

    Scenario: El usuario no pertenece a ningún grupo
        Given que el usuario accede a la sección “Mis Grupos”
        When no se ha unido a ningún grupo
        Then debería mostrarse un mensaje como “Aún no perteneces a ningún grupo”
