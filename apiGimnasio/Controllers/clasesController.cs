using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using apiGimnasio.Clases;


namespace apiGimnasio.Controllers
{
    [EnableCors(origins: "http://localhost:60877", headers: "*", methods: "*")]
    public class clasesController : ApiController
    {
        // GET api/<controller>
        public IQueryable Get()
        {
            clsOpeClase opeClase = new clsOpeClase();
            return opeClase.listarClases();
            
        }

        // GET api/<controller>/5
        public IQueryable Get(int idClase)
        {
            clsOpeClase opeClase = new clsOpeClase();
            return opeClase.listarXClases(idClase);
           
        }

        
    }
}