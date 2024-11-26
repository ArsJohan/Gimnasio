var dir = "http://localhost:52063/api/";
var oTabla = $("#tablaDatos").DataTable();
var rpta;
var f = new Date();
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
            rpta = window.confirm(nombreUsuario + " ¿Estas seguro de cerrar sesión?");
            if (rpta == true) {
                // Redirige a la página anterior y reemplaza la actual en el historial
                window.location.href = "frmLogin.html";
            }

        });

    });

    //Registrar los botones para responder al evento click
    $("#btnAgre").on("click", function () {
        alert("Agregar");
        /*mensajeInfo("");*/
        $("#txtCodigo").val(0);
        let accion = "POST";
        if(validacion(accion)){

            
            if (rpta == true) {
                ejecutarComando(accion);
            } else {
                mensajeInfo("Cancelada acción de Agregar");
            }
        }
    });
    $("#btnModi").on("click", function () {
        alert("Modificar");
        let accion = "PUT"
        if(validacion(accion)){

            
            if (rpta == true) {
                ejecutarComando(accion);
            } else {
                mensajeInfo("Cancelada acción de Modificar");
            }
        }
    });
    $("#btnBusc").on("click", function () {
        Consultar();
        mensajeInfo("Se busco correctamente el empleado");
    });
    $("#btnCanc").on("click", function () {
        alert("Cancelar");
        Cancelar();
        mensajeInfo("Se limpio corectamente");
    });
    $("#btnImpr").on("click", function () {
        /*alert("Impresión");*/
        Imprimir();
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

    $('#dtmFechaNac').datetimepicker({
        format: 'YYYY-MM-DD',


    });
    $('#dtmFechaIng').datetimepicker({
        format: 'YYYY-MM-DD',

    });

    llenarComboTipDoc();
    llenarTabla();


});//Del: jQuery
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

function validacion(accion) { 

    
    let nroD = document.getElementById("txtNroDoc");
    let name = document.getElementById("txtNombre");
    let apellido = document.getElementById("txtApellido");
    let tele = document.getElementById("txtTelefono");
    let sal = document.getElementById("txtSalario");

    // Verificamos si cada valor cumple con el patrón y la longitud

    let formato = new RegExp(name.pattern);
    let tam = new RegExp('^.{3,35}$');
    if (!formato.test(name.value.trim())) {
        mensajeError("Nombre invalido contiene caracteres especiales /o números");
        $("#txtNombre").focus();
        return false;
    }
    if (!tam.test(name.value.trim())) {
        mensajeError("Digite un nombre minimo de 3 caracteres");
        $("#txtNombre").focus();
        return false;
    }
    formato = new RegExp(apellido.pattern);
    if (!formato.test(apellido.value.trim())) {
        mensajeError("Apellido invalido contiene caracteres especiales /o números");
        $("#txtApellido").focus();
        return false;
    }
    if (!tam.test(apellido.value.trim())) {
        mensajeError("Digite un apellido minimo de 3 caracteres");
        $("#txtApellido").focus();
        return false;
    }
    formato = new RegExp(nroD.pattern);
    tam = new RegExp('^.{4,18}$');
    if (!formato.test(nroD.value.trim())) {
        mensajeError("Numero de documento invalido contiene caracteres especiales /o letras");
        $("#txtNroDoc").focus();
        return false;
    }
    if (!tam.test(nroD.value.trim())) {
        mensajeError("Numero de documento invalido, digite nuevamente  entre 6 y 20 caracteres");
        $("#txtNroDoc").focus();
        return false;
    }
    formato = new RegExp(tele.pattern);
    tam = new RegExp('^.{7,30}$');
    if (!formato.test(tele.value.trim())) {
        mensajeError("Telefono invalido contiene caracteres especiales /o letras");
        $("#txtTelefono").focus();
        return false;
    }
    if (!tam.test(tele.value.trim())) {
        mensajeError("Telefono invalido, digite nuevamente entre 7 y  30 caracteres ");
        $("#txtTelefono").focus();
        return false;
    }
    formato = new RegExp(sal.pattern);
    
    if (!formato.test(sal.value.trim())) {
        mensajeError("Salario invalido contiene caracteres especiales /o letras");
        $("#txtSalario").focus();
        return false;
    }
    formato = null;
    tam = null;
    if (accion == 'POST') {
        rpta = window.confirm("Estas seguro de agregar datos de: " + name.value + ", con nro. Doc. " + nroD.value);
        
    }
    else {
        rpta = window.confirm("Estas seguro de modificar datos de: " + name.value + ", con nro. Doc. " + nroD.value);
    }

    
    return true;
}
function editarFila(datosFila) {

    let idTD = datosFila.find('td:eq(5)').text();
    $("#cboTipDoc").val(idTD);
   
    $("#txtCodigo").val(datosFila.find('td:eq(1)').text());
    $("#txtNombre").val(datosFila.find('td:eq(2)').text());
    $("#txtApellido").val(datosFila.find('td:eq(3)').text());
    $("#dtmFechaNac").val(datosFila.find('td:eq(10)').text());
    $("#dtmFechaIng").val(datosFila.find('td:eq(9)').text());
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
    $("#txtNroDoc").focus();
}
function Limpiar() {
    mensajeInfo("");
    
    $("#txtCodigo").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#dtmFechaNac").val("");
    $("#dtmFechaIng").val("");
    $("#txtTelefono").val("");
    $("#cboTipDoc").val("");
    $("#txtNroDoc").val("");
    $("#txtSalario").val("");
    $("#txtIdEmpleado").val("");
    $("#chkActivo").prop("checked");
    
}
function Imprimir() {
    // === Generar el nombre del archivo con la fecha y hora actual ===
    let f = new Date();
    let nomFile = `Empleado_${f.getDate()}_${f.getMonth() + 1}_${f.getFullYear()}_${f.getHours()}_${f.getMinutes()}.pdf`;
    alert("Nombre del archivo generado: " + nomFile);

    // === Obtener los valores del formulario ===
    let Codi = $("#txtCodigo").val();
    let nomb = $("#txtNombre").val();
    let apell = $("#txtApellido").val();
    let tel = $("#txtTelefono").val();
    let TiDo = $("#cboTipDoc").find('option:selected').text();
    let nroD = $("#txtNroDoc").val();
    let salari = $("#txtSalario").val();
    let idEmple = $("#txtIdEmpleado").val();
    let fechaNac = $("#dtmFechaNac").val();
    let fechaIng = $("#dtmFechaIng").val();
    let activo = $("#chkActivo").prop("checked") ? "Sí" : "No";

    // === Crear un nuevo documento PDF ===
    var doc = new jsPDF('p', 'mm', 'letter'); // Orientación, Unidad, Tamaño de página

    // Obtener las dimensiones del documento
    var ancho = doc.internal.pageSize.width;
    var alto = doc.internal.pageSize.height;

    // === Estilos del documento ===
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(122, 109, 93); // Color #7a6d5d para texto

    // === Título principal estilizado ===
    doc.setFontSize(18);
    const tituloPrincipal = "GIMNASIO SIEMPRE EN FORMA";
    const anchoTituloPrincipal = doc.getTextWidth(tituloPrincipal);
    doc.text(tituloPrincipal, (ancho - anchoTituloPrincipal) / 2, 20); // Centrado horizontalmente

    // Subtítulo estilizado
    doc.setFontSize(14);
    const subTitulo = "Datos del Empleado";
    const anchoSubTitulo = doc.getTextWidth(subTitulo);
    doc.text(subTitulo, (ancho - anchoSubTitulo) / 2, 35); // Centrado horizontalmente

    // Línea divisoria estilizada
    doc.setLineWidth(1);
    doc.setDrawColor(122, 109, 93); // Color #7a6d5d
    doc.line(20, 40, ancho - 20, 40);

    // === Agregar información del empleado ===
    let y = 50; // Posición inicial en el eje Y
    doc.setFontSize(12);

    // Función para agregar campos con un diseño bonito
    const addField = (label, value) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(122, 109, 93); // Color #7a6d5d para las etiquetas
        doc.text(label, 20, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0); // Negro para los valores
        doc.text(value, 70, y);
        y += 12; // Espaciado mayor entre las líneas
    };

    // Agregar todos los campos del formulario
    addField("Código:", Codi);
    addField("Nombre:", nomb);
    addField("Apellido:", apell);
    addField("Teléfono:", tel);
    addField("Nro. Documento:", nroD);
    addField("Tipo de Documento:", TiDo);
    addField("Salario:", `$${parseFloat(salari).toFixed(2)}`); // Formato de salario
    addField("ID Empleado:", idEmple);
    addField("Fecha de Nacimiento:", fechaNac);
    addField("Fecha de Ingreso:", fechaIng);
    addField("Activo:", activo);

    // === Pie de página con fecha y hora ===
    doc.setFontSize(10);
    doc.setTextColor(100); // Gris oscuro para el pie de página
    doc.text("Documento generado automáticamente", 20, alto - 20);
    doc.text(`Fecha: ${f.toLocaleDateString()} Hora: ${f.toLocaleTimeString()}`, ancho - 70, alto - 20, { align: "right" });

    // === Guardar el archivo PDF ===
    doc.save(nomFile);
    alert("Se generó el archivo PDF: " + nomFile);
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

        let txtNroDoc = document.getElementById("txtNroDoc");
        let span = document.getElementById("anuncio");
        if (txtNroDoc.value.trim() == "") {
            txtNroDoc.focus();
            span.style.color = "#007bff";
            span.textContent = "Requerido";
            return;
        }
        let formato = new RegExp(txtNroDoc.pattern);
        let tam = new RegExp('^.{4,18}$');
        if (!formato.test(txtNroDoc.value.trim())) {
            mensajeError("Numero de documento invalido contiene caracteres especiales /o letras");
            $("#txtNroDoc").focus();
            return;
        }
        if (!tam.test(txtNroDoc.value.trim())) {
            mensajeError("Error, el nro. del documento no es valido");
            $("#txtNroDoc").focus();
            return;
        }
            
        
        const datosOut = await fetch(dir + "empleado?codEmp=" + txtNroDoc.value,
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
            mensajeInfo("No se encontró el empleado con nro. doc. : " + txtNroDoc.value);
            return;
        }
        $("#txtCodigo").val(datosIn[0].Codigo);
        $("#txtNombre").val(datosIn[0].Nombre);
        $("#txtApellido").val(datosIn[0].Apellido);
        $("#dtmFechaNac").val(datosIn[0].FechaN);
        $("#dtmFechaIng").val(datosIn[0].FechaIng);
        $("#txtTelefono").val(datosIn[0].Telefono);
        $("#cboTipDoc").val(datosIn[0].idTD);
        $("#txtNroDoc").val(datosIn[0].Nro_doc);
        $("#txtSalario").val(datosIn[0].Salario);
        $("#txtIdEmpleado").val(datosIn[0].Empleado);
        $("#chkActivo").prop("checked", datosIn[0].Activo);
        llenarComboTipDoc(datosIn[0].idTD);
        span.textContent = null;
    } catch (error) {
        mensajeError("Error: " + error);
    }
}


async function ejecutarComando(accion) {
    //Capturar los datos de entrada
    let codigo = $("#txtCodigo").val();
    let nombre = $("#txtNombre").val();
    let apellido = $("#txtApellido").val();
    let fechaN = $("#dtmFechaNac").val();
    let fechaIn = $("#dtmFechaIng").val();
    let telefono = $("#txtTelefono").val();
    let tipDoc = $("#cboTipDoc").val();
    let nroD = $("#txtNroDoc").val();
    let salario = $("#txtSalario").val();
    let idEmple = sessionStorage.getItem('codUsu');
    let activo = $("#chkActivo").prop("checked");


    //Json es un lenguaje que permite gestionar datos con 
    //formato de estructura: Clave - Valor, y que puede contener 
    //estructuras complejas dentro de sus valores
    //Nombre: Valor
    let datosOut = {
        Codigo_Empleado: codigo,
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