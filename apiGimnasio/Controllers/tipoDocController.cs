using apiGimnasio.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace apiGimnasio.Controllers
{
    public class tipoDocController : ApiController
    {
        // GET api/<controller>
        public IQueryable Get()
        {
            clsOpeTipoDoc opeTipDoc = new clsOpeTipoDoc();
            return opeTipDoc.listarTipDocs();
        }


    }
}