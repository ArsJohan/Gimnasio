var dir = "http://localhost:52063/api/";

jQuery(function () {
    //Carga el menú
    $("#dvMenu").load("../Paginas/Menu.html");
    //Calendario
    $('#dtmFechaNac').datetimepicker({
        format: 'DD/MM/YYYY',
       
    
    });
    $('#dtmFechaIng').datetimepicker({
        format: 'DD/MM/YYYY',
       
    });
});