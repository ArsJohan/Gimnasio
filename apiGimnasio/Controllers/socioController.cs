using apiGimnasio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using apiGimnasio.Clases;

namespace apiGimnasio.Controllers
{
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