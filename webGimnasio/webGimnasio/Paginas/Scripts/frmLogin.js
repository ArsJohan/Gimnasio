let dir = "";
jQuery(function () {

    $("#btnIngresar").on("click", function () {

        window.location.href = "frmInicio.html";
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
        }});
    //$("#btnIngresar").on("click", async function () {



    //    try {
    //        let clave = $("#user_clave").val();
    //        let pass = $("#user_password").val();

    //        const datosOut = await fetch(dir + "login?clave=" + clave,
    //            {
    //                method: "GET",
    //                mode: "cors",
    //                headers: {
    //                    "content-type": "application/json",

    //                }

    //            }
    //        );
    //        const datosIn = await datosOut.json();
    //        if (datosIn == "") {
    //            mensajeError("Clave o Contraseña erroneos");
    //            return;
    //        }

    //        let api_pass = datosIn.Contrasena;
    //        if (pass == api_pass) {
    //            window.location.href = "frmInicio.html?" + datosIn.Codigo;
    //            return;

    //        }
    //        else {
    //            mensajeError("Clave o Contraseña erroneos");
    //            return;
    //        }

    //    } catch (error) {
    //        mensajeError("Error: " + error);
    //    }
    //});
       

