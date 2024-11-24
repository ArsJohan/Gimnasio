var dir = "http://localhost:52063/api/";
var oTabla = $("#tablaDatos").DataTable();

jQuery(function () {
    //Carga el menú
    $("#dvMenu").load("../Paginas/Menu.html", function () {
        const nombreUsuario = sessionStorage.getItem('nombreUsu');
        if (nombreUsuario == null) {
            sessionStorage.clear();
            window.location.href = "frmSplash.html";
            return;
        }
        // Selecciona el div
        $("#Name").empty();
        $("#Name").append('<h4>' + nombreUsuario + '</h4>');
        $("#cierreSesion").on("click", function () {
            // Limpia el sessionStorage
            sessionStorage.clear();
            let rpta = window.confirm(nombreUsuario + " ¿Estas seguro de cerrar sesión?");
            if (rpta == true) {
                // Redirige a la página anterior y reemplaza la actual en el historial
                window.location.href = "frmLogin.html";
            }

        });

    });

    $("#btnAgre").on("click", function () {
        alert("Agregar");
        //ejecutarComando("POST");
        let cod = $("#txtCodigo").val();
        if (cod == undefined || cod.trim() == "" || parseInt(cod, 10) <= 0) {
            grabarEncabezadoMat();
        }
        else {
            grabarDetalleMat();
        }

    });
    $("#btnModi").on("click", function () {
        alert("Modificar");
        //Modificar();
        //ejecutarComando("PUT");
    });
    $("#btnBusc").on("click", function () {
        alert("Buscar");
        Consultar();
    });
    $("#btnCanc").on("click", function () {
        alert("Cancelar");
        Cancelar();
    });
    $("#btnImpr").on("click", function () {
        alert("Impresión");
        //Imprimir();
    });
    $('#dtmFechaFin').datetimepicker({
        format: 'YYYY-MM-DD',


    });
    $('#dtmFechaIni').datetimepicker({
        format: 'YYYY-MM-DD',

    });
    
    
    $("#tablaDatos tbody").on("click", 'tr', function (evento) {
        evento.preventDefault();
        // levanta el evento click sobre la tabla
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#tablaDatos tbody tr.selected').removeClass('selected');
            $(this).addClass('selected');
            editarFila($(this).closest('tr'));
        }
    });

    $("#txtNroDoc").on("change", async function () {
        let doc = $("#txtNroDoc").val();
        let url = dir+"socio?nrDoc="+doc;
        let rpta = await llenarComboGral(url, "#cboSocio");
       
    });

    llenarComboTipDoc();
    llenarTabla();
    llenarComboClase();
    
    
});

function mensajeError(texto) {
    $("#dvMensaje").removeClass();
    $("#dvMensaje").addClass("alert alert-danger");
    $("#dvMensaje").html(texto);
}
function mensajeInfo(texto) {
    $("#dvMensaje").removeClass();
    $("#dvMensaje").addClass("alert alert-info");
    $("#dvMensaje").html(texto);
}
function mensajeOk(texto) {
    $("#dvMensaje").removeClass();
    $("#dvMensaje").addClass("alert alert-success");
    $("#dvMensaje").html(texto);
}
async function llenarComboTipDoc(doc) {
    let url = dir + "tipoDoc";
    let rpta = await llenarComboGral(url, "#cboTipDoc");
    if (doc != undefined && rpta == "Termino");
        $("#cboTipDoc").val(doc);
}
async function llenarComboClase() {
    let url = dir + "clases";
    let rpta = await llenarComboGral(url, "#cboClase");
    if (rpta == "Termino") {
        llenarComboDia();
        llenarComboHora();
        ConsultarClase();
    }
}
async function llenarComboDia() {
    let url = dir + "dia";
    let rpta = await llenarComboGral(url, "#cboDia");

}

async function llenarComboHora() {
    let url = dir + "horas";
    let rpta = await llenarComboGral(url, "#cboHora");

}
function Cancelar() {
    mensajeInfo("");
    Limpiar();
    $("#txtCodigo").val("0");
    $("#cboClase").focus();
}
function Limpiar() {
    mensajeInfo("");

    $("#txtCodigo").prop('disable', true);
    $("#cboClase").val("");
    $("#dtmFechaFin").val("");
    $("#dtmFechaIni").val("");
    $("#txtIdEmpleado").val("");
    $("#txtSala").val("");
    $("#txtMonitor").val("");
    $("#txtDescripcion").val("");
    $("#cboDia").val("");
    $("#cboHora").val("");
    $("#cboTipDoc").val("");
    $("#txtNroDoc").val("");
    $("#txtSocio").val("");
    $("#txtValor").val("");
    //limpiar data table
    $("#tablaDatos tr").empty();
    $("#cboClase").focus();
}


async function ConsultarClase() {
    let cod = $("#cboClase").val();
    var url = dir + "clases?idClase=" + cod;
    const datosIn = await fetch(url,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
        }
    ); //JSON.stringify
    const Rpta = await datosIn.json();

    $("#cboClase").val(Rpta[0].Codigo);
    $("#txtSala").val(Rpta[0].Sala);
    $("#txtMonitor").val(Rpta[0].Monitor);
    $("#cboHora").val(Rpta[0].idHoras);
    $("#cboDia").val(Rpta[0].idDia)

}

async function Consultar() {
    try {
        Limpiar();
        mensajeInfo("");
        $("#txtCodigo").prop('disabled', false);
        let cod = $("#txtCodigo").val();
        if (cod == undefined || cod.trim() == "" || parseInt(cod, 10) <= 0) {
            $("#txtCodigo").val("");
            $("#txtCodigo").focus();
            mensajeInfo("Ingresa el codigo de la Matricula");
            return;
        }
        $("#txtCodigo").prop('disabled', true);
        
        var url = dir + "matricula?codMat=" + cod;
        const datosIn = await fetch(url,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },      
            }
        ); //JSON.stringify
        const Rpta = await datosIn.json();
        console.log(Rpta);
        $("#txtCodigo").val(Rpta[0].codigo_Matricula);
        $("#cboTipDoc").val(Rpta[0].codigo_TipoDoc);
        $("#txtNroDoc").val(Rpta[0].nroDoc);
        $("#txtSocio").val(Rpta[0].Socio);
        $("#txtDescripcion").val(Rpta[0].Descripcion);
        $("#txtIdEmpleado").val(Rpta[0].codigo_Empleado);
        $("#txtValor").val(Rpta[0].Precio);
        $("#dtmFechaIni").val(Rpta[0].FechaIn);
        $("#dtmFechaFin").val(Rpta[0].FechaFin);
        //aca realizara el llenado de la tabla con los artistas registrados
        llenarTabla();
    }
    catch (error) {
        mensajeError("Error" + error);
    }
}

async function Eliminar(codDetMatri) {
    let url = dir + "detMat?idDetI=" + codDetMatri;
    const datosOut = await fetch(url,
        {
            method: "Delete",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    
    const rpta = await datosOut.json();
    if (rpta.substring(0, 5) == "Error") {
        mensajeError(rpta);
    } else {
        mensajeOk(rpta);
    }
    Consultar();//para refrescar
}
function editarFila(datosFila) {

    let codDetl = datosFila.find('td:eq(1)').text();
    let nomSocio = datosFila.find('td:eq(9)').text();
    let rpta = window.confirm('Estas seguro de eliminar el registro del Socio' + nomSocio + 'de la Mareicula');
    if (rpta == true) {
        Eliminar(codDetl);
    } else {
        mensajeInfo("Cancelada la accion de retirar el Socio de la Matricula");
    }
}
async function llenarTabla() {
    let cod = $("#txtCodigo").val();
    if (cod == undefined || cod.trim() == "" || parseInt(cod, 10) < 0) {
        

        return;

    }
    let url = dir + "detMat?dato=" + cod;
    let rpta = await llenarTablaGral(url, "#tablaDatos");
    if (rpta == "Termino") {
    }

    if (rpta == "Error") {
        mensajeInfo("Matricula:" + cod + ",sin Socio o no encontrado");

    }
}
async function grabarEncabezadoMat() {
    mensajeOk("");
    let idCod = $("#txtCodigo").val();
    let descrip = $("#txtDescripcion").val().trim();
    let vrl = $("#txtValor").val().trim();

    if (idCod == undefined || idCod.trim() == "" || parseInt(idCod, 10) < 0) {
        $("#dvMensaje").html("No se ha definido la accion de grabar, cancele o limpie antes");
        $("#cboClase").focus();
        return;
    }
    if (descrip == undefined || descrip.trim() == "") {
        $("#dvMensaje").html("No se ha definido la Descripcion");
        $("#txtDescripcion").focus();
        return;
    }
    let idEmple = sessionStorage.getItem('codUsu');
    let idTipDoc = $("#cboTipDoc").val();
    let idSocio = $("#cboSocio").val();    //==========================
    //grabar encabezado:tblInscripc
    if (idCod == 0)//si es nuevo registro de matricula
    {
        let datosMat = {
            Codigo: 0,
            Descripcion: descrip,
            codigo_Socio: idSocio,
            codigo_Empleado: idEmple,
            codigo_TipDoc: idTipDoc,
            Precio: vrl
        }
        try {
            let url = dir + "matricula?cmdo=1";
            const datosOut = await fetch(url,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosMat),
                }
            );
            const datosInt = await datosOut.json();
            console.log(datosInt);
            idCod = datosInt.codigo_Matricula;
            $("#txtCodigo").val(idCod);
            //grabar detalle:tblDetInsc
            grabarDetalleMat();
        }
        catch (error) {
            mensajeError(error);
            return;
        }
    }
    else {
        alert("Error,Accion no permitida")
    }
}


async function grabarDetalleMat() {
    let idCod = $("#txtCodigo").val();
    //======================================
    if (parseInt(idCod, 10) > 0) {
        let idclas = $("#cboClase").val();
        let fechaIni = $("#dtmFechaIni").val().trim();
        let fechaFin = $("#dtmFechaIni").val().trim();
        let idEmple = sessionStorage.getItem('codUsu');
        let datosOut = {
            codigo_DetallesMatr: 0,
            codigo_Clase: idclas,
            codigo_Matricula: idCod,
            Fecha_Inicio: fechaIni,
            codigo_Empleado: idEmple,
            Fecha_Fin: fechaFin

            
        };
        try {
            let url = dir + "detMat";
            const datosIn = await fetch(url,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosOut),
                }
            );
            const Rpta = await datosIn.json();
            console.log(Rpta);
            let Cod = Rpta.codigo_DetallesMatr;
            $("#txtCodigo").val(idCod);
            llenarTabla();
            mensajeOk("Se grabo la Matricula:" + idCod + "Con registro #" + Cod);
        }
        catch (error) {
            mensajeError(error);
            return;
        }
    }
}
//async function Modificar() {
//    let idCod = $("#txtCodigo").val();
//    let repre = $("#txtRepres").val();
//    let tel = $("#txtTel").val();

//    if (idCod == undefined || idCod.trim() == "" || parseInt(idCod, 10) < 0) {
//        $("#dvMensaje").html("No ha definido la acción de grabar, cancele o limpie antes").$("#cboEvento")
//        $("#Evento").focus();
//        return;

//        if (repre == undefined || repre.trim() == "") {
//            $("#dvMensaje").html("No ha definido el representante"); $("#txtRepres").focus();

//            return;

//            if (tel == undefined || tel.trim() == "") {
//                $("#dvMensaje").html("No ha definido el teléfono"); $("#txtTel").focus();

//                return;

//            }

//            let datosOut = {

//                Codigo: idCod,

//                Representante: repre,

//                Telefono: tel

//            };

//            try {

//                const datosin = await fetch(dir + "inscripc?comando=2", {

//                    method: "Put", headers: {
//                        "Content-Type": "application/json", body: JSON.stringify(datosOut), const rpta = await datosIn.json(); mensajeOk(rpta); mensajeError("Error: ", error);

//                    });

//            } catch (error) {

//            }

//        }