using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using apiGimnasio.Models;
namespace apiGimnasio.Clases
{
    public class clsOpeTipoDoc
    {
        //Atributo 
        private readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        public IQueryable listarTipDocs()
        {
            return from tDoc in oEFR.Set<TIPO_DOC>()
                   .OrderBy(x => x.TipoDoc)
                   select new
                   {
                       Codigo = tDoc.Codigo_TipoDoc,
                       Nombre = tDoc.TipoDoc
                   };
        }
    }
}