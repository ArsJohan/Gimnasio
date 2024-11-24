using apiGimnasio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using apiGimnasio.Clases;
using System.Web.Http.Cors;

namespace apiGimnasio.Controllers
{
    [EnableCors(origins: "http://localhost:60877", headers: "*", methods: "*")]
    public class socioController : ApiController
    {
        

        // GET api/<controller>/5
        public IQueryable Get(string nrDoc)
        {
            clsOpeSocio opeSocio = new clsOpeSocio();
            return opeSocio.listarXSocio(nrDoc);
        }

       

        
    }
}