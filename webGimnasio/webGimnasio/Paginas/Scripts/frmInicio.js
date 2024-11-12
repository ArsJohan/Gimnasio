let dir = "";
jQuery(function () {
    //Carga el menú
    $("#dvMenu").load("../Paginas/Menu.html");
    //let codigo = window.location.search.substr(1);
    //buscarNombre(codigo,"#col-2");
    
});

//async function buscarNombre(codigo,divnombre) {

//   try {
//        const Respuesta = await fetch(dir+"Empleado?codigo="+codigo,
//            {
//                method: "GET",
//                mode: "cors",
//                headers: { "content-type": "application/json", }
//            }
//        );
//        const Rpta = await Respuesta.json();
       
//        $(divNombre).empty();
      
//        $(divnombre).add('<h4>' + Rpta.Nombre+'</h4>');
        
//        return "Termino";
//    }
//    catch (error) {
//        return error;
//    }

//}