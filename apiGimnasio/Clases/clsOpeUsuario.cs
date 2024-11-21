using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using apiGimnasio.Models;

namespace apiGimnasio.Clases
{
    
    public class clsOpeUsuario
    {
        //Atributo 
        private readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        

        public IQueryable buscarUsuario(int clave,string contra)
        {
            return from ts in oEFR.Set<USUARIO>()
                   join tE in oEFR.Set<EMPLEADO>()
                   on ts.codigo_EMPLEADO equals tE.Codigo_Empleado

                   where ts.Clave == clave && ts.Contrasenia == contra
                   select new
                   {
                      
                        Codigo = tE.Codigo_Empleado,
                        Nombre = tE.Nombre,
                        Apellido = tE.Apellido,
                        Activo = tE.Activo

                   };

        }
    }
}