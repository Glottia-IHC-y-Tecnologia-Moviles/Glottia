Feature: Adaptabilidad del diseño a diferentes dispositivos

    Scenario: Visualización correcta en dispositivos móviles 
        Given que el usuario accede a la plataforma desde un teléfono móvil
        When se carga la página principal
        Then todos los elementos deben ajustarse al tamaño de pantalla del dispositivo
        And los menús deben ser accesibles mediante navegación táctil

    Scenario: Visualización correcta en tablets
        Given que el usuario accede desde una tablet
        When interactúa con las secciones de eventos y calendario
        Then el diseño debe mantenerse ordenado y funcional
        And los elementos deben escalar correctamente según la resolución

    Scenario: Adaptación automática al cambiar el tamaño de la ventana
        Given que el usuario está en una computadora de escritorio
        When cambia el tamaño de la ventana del navegador
        Then los elementos deberán organizarse automáticamente sin superponerse entre ellos.