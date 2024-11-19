async function llenarTablaGral(url, Tabla)
{
    //Llamar el servicio de Productos, para el método post
    try {
        const Respuesta = await fetch(url,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                }
            }
        );
        const Rpta = await Respuesta.json();
        //Llena el encabezado
        var columns = [];
        columnNames = Object.keys(Rpta[0]);
        for (var i in columnNames) {
            columns.push({
                data: columnNames[i],
                title: columnNames[i]
            });
        }
        //Llena los datos
        $(Tabla).DataTable({
            data: Rpta,
            columns: columns,
            destroy: true
        });
        return "Termino";
    }
    catch (error) {
        return "Error";
    }
}