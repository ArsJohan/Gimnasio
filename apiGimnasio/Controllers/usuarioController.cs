using apiGimnasio.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace apiGimnasio.Controllers
{
    [EnableCors(origins: "http://localhost:60877", headers: "*", methods: "*")]
    public class usuarioController : ApiController
    {
       
        // GET api/<controller>/5
        public IQueryable Get(int clave, string contra)
        {
            clsOpeUsuario opeUsuario = new clsOpeUsuario();

            return opeUsuario.buscarUsuario(clave, contra);
        }

    }
}