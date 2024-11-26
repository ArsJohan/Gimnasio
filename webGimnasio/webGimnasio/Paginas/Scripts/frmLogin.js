var dir = "http://localhost:52063/api/";
jQuery(function () {

    $("#btnIngresar").on("click", function () {
        alert("logearse");
        let clave = $("#user_clave").val();
        let pass = $("#user_password").val();

        if (clave.trim() == "" || parseInt(clave) <= 0 ) {
            mensajeError("Clave o Contraseña erroneos");
            $("#user_clave").focus();
            return;
        }
        if ( pass == undefined||pass.trim() == "" )
        {
            mensajeError("Clave o Contraseña erroneos");
            $("#user_password").focus();
            return;
        }
        logearse(clave, pass);
        
    });
    
});
       
function mensajeError(texto) {
    $("#dvMensaje").removeClass("alert alert-success");
    $("#dvMensaje").addClass("alert alert-danger");
    $("#dvMensaje").html(texto);
}
function mensajeInfo(texto) {
    $("#dvMensaje").removeClass("alert alert-success");
    $("#dvMensaje").addClass("alert alert-info");
    $("#dvMensaje").html(texto);
}
function mensajeOk(texto) {
    $("#dvMensaje").removeClass("alert alert-success");
    $("#dvMensaje").addClass("alert alert-success");
    $("#dvMensaje").html(texto);
}
async function logearse(clave, contra) {
    try {


        const datosOut = await fetch(dir + "usuario?clave=" + clave + "&contra=" +contra,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                        
                }    

            }
        );
        const datosIn = await datosOut.json();
        if (datosIn == "" || datosIn[0].Activo == false) {
            mensajeError("Clave o Contraseña erroneos");
            return;
        }

        sessionStorage.setItem('codUsu', datosIn[0].Codigo);
        sessionStorage.setItem('nombreUsu', datosIn[0].Nombre + " " + datosIn[0].Apellido);
        window.location.href = "frmInicio.html";
        return;
    } catch (error) {
        mensajeError("Error: " + error);
        return;
    }
}
