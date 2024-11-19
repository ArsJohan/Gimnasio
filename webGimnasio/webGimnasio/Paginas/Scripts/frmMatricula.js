jQuery(function () {
    //Carga el menú
    $("#dvMenu").load("../Paginas/Menu.html", function () {
        const nombreUsuario = sessionStorage.getItem('nombreUsuario');
        // Selecciona el div
        $("#Name").empty();
        $("#Name").append('<h4>' + nombreUsuario + '</h4>');
        $("#cierreSesion").on("click", function () {
            // Limpia el sessionStorage
            sessionStorage.clear();
            let rpta = window.confirm(nombreUsuario + " ¿Estas seguro de cerrar sesión?");
            if (rpta == true) {
                // Redirige a la página anterior y reemplaza la actual en el historial
                window.location.replace(document.referrer);
            }

        });

    });

});