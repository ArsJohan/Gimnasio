using apiGimnasio.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace apiGimnasio.Controllers
{
    [EnableCors(origins: "http://localhost:60877", headers: "*", methods: "*")]
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