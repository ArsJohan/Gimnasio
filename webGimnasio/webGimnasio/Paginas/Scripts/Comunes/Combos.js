    async function llenarComboGral(url, combo)
{
    try {
        const Respuesta = await fetch(url,
            {
                method: "GET",
                mode: "cors",
                headers: { "content-type": "application/json", }
            }
        );
        const Rpta = await Respuesta.json();
        console.log(Rpta);
        //Recorrer la respuesta en Rpta, para agregarla al combo de tipo de producto
        $(combo).empty();
        //Se recorre la respuesta
        for (i = 0; i < Rpta.length; i++) {
            $(combo).append('<option value=' + Rpta[i].Codigo + '>' + Rpta[i].Nombre + '</option>');
        }
        //Tener muy encuenta los nombres de los campos, deben ser iguales
        return "Termino";
    }
    catch (error) {
        return error;
    }
}