var dir = "http://localhost:52063/api/";
var oTabla = $("#tablaDatos").DataTable();

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

    //Registrar los botones para responder al evento click
    $("#btnAgre").on("click", function () {
        alert("Agregar");
        mensajeInfo("");
        $("#txtCodigo").val(0);
        let nroD = $("#txtNroDoc").val();
        let name = $("#txtNombre").val();
        alert("nroDoc " + nroD + "nombre" + name);
        if (name.trim() == "" || nroD.trim() == "" || parseInt(nroD, 10) <= 0) {
            mensajeError("Debe Buscar 1ro. un Empleado");
            $("#txtNroDoc").focus();
            return;
        }
        else {

            let rpta = window.confirm("Estas seguro de agregar datos de: " + name + ", con nro. Doc. " + nroD);
            if (rpta == true) {
                ejecutarComando("POST");
            } else {
                mensajeInfo("Cancelada acción de Agregar");
            }
        }
    });
    $("#btnModi").on("click", function () {
        alert("Modificar");
        mensajeInfo("");
        let codigo = $("#txtCodigo").val();
        let nroD = $("#txtNroDoc").val();
        let name = $("#txtNombre").val();
        let tele = $("#txtTelefono").val();
        alert("nroDoc " + nroD + "nombre" + name);
        if (name.trim() == "" || nroD.trim() == "" || parseInt(nroD, 10) <= 0 || codigo.trim() == "" || parseInt(codigo, 10) <= 0) {
            mensajeError("Debe Buscar 1ro. un empleado");
            $("#txtNroDoc").focus();
            return;
        }
        if (tele.trim() == "" || parseInt(tele) <= 0)
        {
            mensajeError("Debe agrgar un telefono");
            $("#txtTelefono").focus(); 
            return;
        }
        else {

            let rpta = window.confirm("Estas seguro de modificar datos de: " + name + ", con nro. Doc. " + nroD);
            if (rpta == true) {
                ejecutarComando("PUT");
            } else {
                mensajeInfo("Cancelada acción de Modificar");
            }
        }
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
    
    $("#tablaDatos tbody").on("click", 'tr', function (evento) {
        evento.preventDefault();
        // levanta el evento click sobre la tabla
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        $('#tablaDatos tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
        editarFila($(this).closest('tr'));


    });
    //Calendario
    $('#dtmFechaNac').datetimepicker({
        format: 'DD/MM/YYYY',


    });
    $('#dtmFechaIng').datetimepicker({
        format: 'DD/MM/YYYY',

    });
 

    llenarComboTipDoc();
    llenarTabla();


});//Del: jQuery
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

function editarFila(datosFila) {

    let idTD = datosFila.find('td:eq(5)').text();
    $("#cboTipDoc").val(idTD);
   
    $("#txtCodigo").val(datosFila.find('td:eq(1)').text());
    $("#txtNombre").val(datosFila.find('td:eq(2)').text());
    $("#txtApellido").val(datosFila.find('td:eq(3)').text());
    $("#dtmFechaNac").text(datosFila.find('td:eq(10)').text());
    $("#dtmFechaIng").text(datosFila.find('td:eq(9)').text());
    $("#txtTelefono").val(datosFila.find('td:eq(4)').text());
    $("#txtNroDoc").val(datosFila.find('td:eq(7)').text());
    $("#txtSalario").val(datosFila.find('td:eq(8)').text());
    $("#txtIdEmpleado").val(datosFila.find('td:eq(11)').text());
    $("#chkActivo").prop("checked", datosFila.find('td:eq(12)').text() == 'true');
    mensajeOk("OK");
 
}

function Cancelar() {
    mensajeInfo("");
    Limpiar();
    $("#txtCodigo").val("0");
    $("#cboBanda").focus();
}
function Limpiar() {
    mensajeInfo("");
    
    $("#txtCodigo").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#dtmFechaNac").text("");
    $("#dtmFechaIng").text("");
    $("#txtTelefono").val("");
    $("#cboTipDoc").val("");
    $("#txtNroDoc").val("");
    $("#txtSalario").val("");
    $("#txtIdEmpleado").val("");
    $("#chkActivo").prop("checked");
    
    //limpiar data table
    $("#tablaDatos tr").empty();
    $("#txtNroDoc").focus();
}

async function llenarTabla() {
    let rpta = await llenarTablaGral(dir + "empleado", "#tablaDatos");
}

async function llenarComboTipDoc() {
    let url = dir + "tipoDoc";
    let rpta = await llenarComboGral(url, "#cboTipDoc");

}

async function Consultar() {
    mensajeInfo("");
    try {
        let nroDoc = $("#txtNroDoc").val();
        if (nroDoc == undefined || nroDoc.trim() == "" || parseInt(nroDoc, 10) <= 0) {
            mensajeError("Error, el nro. del documento no es valido");
            $("#txtNroDoc").focus();
            return;
        }
        const datosOut = await fetch(dir + "empleado?codEmp=" + nroDoc,
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
            mensajeInfo("No se encontró el empleado con nro. doc. : " + nroDoc);
            return;
        }
        $("#txtCodigo").val(datosIn[0].Codigo);
        $("#txtNombre").val(datosIn[0].Nombre);
        $("#txtApellido").val(datosIn[0].Apellido);
        $("#dtmFechaNac").text(datosIn[0].FechaN);
        $("#dtmFechaIng").text(datosIn[0].FechaIng);
        $("#txtTelefono").val(datosIn[0].Telefono);
        $("#cboTipDoc").val(datosIn[0].idTD);
        $("#txtNroDoc").val(datosIn[0].Nro_doc);
        $("#txtSalario").val(datosIn[0].Salario);
        $("#txtIdEmpleado").val(datosIn[0].Empleado);
        $("#chkActivo").prop("checked", datosIn[0].Activo);
        llenarComboTipDoc(datosIn[0].idTD);


    } catch (error) {
        mensajeError("Error: " + error);
    }
}


async function ejecutarComando(accion) {
    //Capturar los datos de entrada
    let codigo = $("#txtCodigo").val();
    let nombre = $("#txtNombre").val();
    let apellido = $("#txtApellido").val();
    let fechaN = $("#dtmFechaNac").text();
    let fechaIn = $("#dtmFechaIng").text();
    let telefono = $("#txtTelefono").val();
    let tipDoc = $("#cboTipDoc").val();
    let nroD = $("#txtNroDoc").val();
    let salario = $("#txtSalario").val();
    let idEmple = $("#txtIdEmpleado").val();
    let activo = $("#chkActivo").prop("checked");


    //Json es un lenguaje que permite gestionar datos con 
    //formato de estructura: Clave - Valor, y que puede contener 
    //estructuras complejas dentro de sus valores
    //Nombre: Valor
    let datosOut = {
        Codigo: codigo,
        Nombre: nombre,
        Apellido: apellido,
        Fecha_Nac: fechaN,
        Fecha_Ingreso: fechaIn,
        Telefono: telefono,
        codigo_TipoDoc:tipDoc,
        nroDoc: nroD,
        Salario:salario,
        id_Empleado: idEmple,
        Activo: activo
    }
    //Invocar el servicio con fetch
    try {
        const response = await fetch(dir + "empleado", {
            method: accion,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosOut),
        });   // stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON

        const Respuesta = await response.json();
        Consultar(); //Para refrescar datos en pantalla (nuevo)
        llenarTabla();
        mensajeOk(Respuesta);

    } catch (error) {
        mensajeError("Error: ", error);
    }
}