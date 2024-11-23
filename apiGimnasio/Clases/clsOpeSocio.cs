using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using apiGimnasio.Models;
namespace apiGimnasio.Clases
{
    public class clsOpeSocio
    {
        //Atributo
        private readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();


        public IQueryable listarXSocio(string nroD)
        {
            return from tS in oEFR.Set<SOCIO>()
                   where tS.Activo == true && tS.nroDoc == nroD
                   orderby tS.codigo_Socio
                   select new
                   {
                       Socio = tS.Nombre + " " + tS.Apellido

                   };
        }

    }
}