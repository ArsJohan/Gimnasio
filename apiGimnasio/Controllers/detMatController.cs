using apiGimnasio.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using apiGimnasio.Models;

namespace apiGimnasio.Controllers
{
    [EnableCors(origins: "http://localhost:60877", headers: "*", methods: "*")]
    public class detMatController : ApiController
    {

        // GET api/<controller>
        public IQueryable Get(int dato)
        {
            clsOpeDetMat opeDet = new clsOpeDetMat();
            return opeDet.llenarTabla(dato);

        }


        // POST api/<controller>
        public DETALLE_MATRICULA Post([FromBody] DETALLE_MATRICULA tblDet)
        {
            clsOpeDetMat opeDetInsc = new clsOpeDetMat();
            opeDetInsc.tblDetMat = tblDet;
            return opeDetInsc.Agregar();
        }


        // DELETE api/<controller>/5
        public string Delete(int idDetI)
        {
            clsOpeDetMat opeDetInsc = new clsOpeDetMat();
            return opeDetInsc.Eliminar(idDetI);
        }
    }
}