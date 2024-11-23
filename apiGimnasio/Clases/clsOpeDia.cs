using apiGimnasio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace apiGimnasio.Clases
{
    public class clsOpeDia
    {
        //Atributo 
        private readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        public IQueryable listarDias()
        {
            return from tD in oEFR.Set<DIA>()
                   orderby tD.codigo_Dia
                   select new
                   {
                       Codigo = tD.codigo_Dia,
                       Nombre = tD.Descripcion
                   };
        }
    }
}