using apiGimnasio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace apiGimnasio.Clases
{
    public class clsOpeHoras
    {
        //Atributo 
        private readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        public IQueryable listarHoras()
        {
            return from tH in oEFR.Set<HORA>()
                   orderby tH.codigo_Horas
                   select new
                   {
                       Codigo = tH.codigo_Horas,
                       Nombre = tH.Descripcion
                   };
        }
    }
}