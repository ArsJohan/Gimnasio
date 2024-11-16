var dir = "http://localhost:65376/api/";
jQuery(function () {

    $("#btnIngresar").on("click", function () {
        alert("logearse");
        let clave = $("#user_clave").val();
        let pass = $("#user_password").val();

        if (clave.trim() == "" || parseInt(clave) <= 0 ) {
            mensajeError("Error, clave No valida");
            $("#user_clave").focus();
            return;
        }
        if ( pass == undefined||pass.trim() == "" || pass.length>30)
        {
            mensajeError("Error,Contraseña No valida");
            $("#user_password").focus();
            return;
        }
        logearse(clave,pass);
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
        if (datosIn == "") {
            mensajeError("Clave o Contraseña erroneos");
            return;
        }

        let api_pass = datosIn.Contrasena;
        if (pass == api_pass) {
            window.location.href = "frmInicio.html?" + datosIn.Codigo;
            return;

        }
        else {
            mensajeError("Clave o Contraseña erroneos");
            return;
        }

    } catch (error) {
        mensajeError("Error: " + error);
    }
}
//async function ingresar() {
//    //consultar a la Api
//    try {
//        let con = $("#user_password").val();
//        let pas = $("#user_clave").val();
//        let ok = false;
//        if (con.trim() == "" || pas.trim() == "") {
//            mensajeError("Error,contraseña o codigo están vacíos");
//            $("#user_password").focus();
//            return;
//        }

//        const datosOut = await fetch(dir + "artista?dato=" + nroDoc + "&comando=2",

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
//            mensajeInfo("Usuario o Contraseña Incorrecta");
//            $("#user_password").val();
//            $("#user_clave").val();
//            $("#user_password").focus();
//            return;
//        }
//        if (usu == datosIn[0].nUsuario && pas == datosIn[0].nClave) {
//            ok = true;
//            nUsu = datosIn[0].Emp
//            iUsu = datosIn[0].idEmp
//        }

//        if (ok) {
//            if (window.sessionStorage) {
//                sessionStorage.setItem("xxnUsu", nUsu);
//                sessionStorage.setItem("xxiUsu", iUsu);
//                location.href = "frmInicio.html";
//            }
//        }

//    } catch (error) {
//        mensajeError("Error: " + error);
//    }
//}