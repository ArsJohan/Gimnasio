using apiGimnasio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace apiGimnasio.Clases
{
    public class clsOpeClase
    {

        //Atributo 
        private readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        public IQueryable listarClases()
        {
            return from tC in oEFR.Set<CLASE>()
                   where tC.Activo == true
                   orderby tC.codigo_Clase
                   select new
                   {
                       Codigo = tC.codigo_Clase,
                       Nombre = tC.Descripcion
                   };
        }


        public IQueryable listarXClases(int cod)
        {
            return from tC in oEFR.Set<CLASE>()
                   join tS in oEFR.Set<SALA>()
                     on tC.codigo_Sala equals tS.codigo_Sala
                   join tM in oEFR.Set<MONITOR>()
                     on tC.codigo_Monitor equals tM.codigo_Monitor
                   where tC.codigo_Clase == cod
                   select new
                   {
                       Codigo = tC.codigo_Clase,
                       Descripcion = tC.Descripcion,
                       Sala = tS.Ubicacion,
                       Monitor = tM.Nombre + " " + tM.Apellido
                   };

        }
    }
}