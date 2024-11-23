using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using apiGimnasio.Models;
using apiGimnasio.Clases;   

namespace apiGimnasio.Controllers
{
    [EnableCors(origins: "http://localhost:60877", headers: "*", methods: "*")]
    public class matriculaController : ApiController
    {
        // POST api/<controller>
        public MATRICULA Post([FromBody] MATRICULA objIn, int cmdo)
        {
            clsOpeMatricula opeInscrip = new clsOpeMatricula();
            opeInscrip.tblMat = objIn;
            switch (cmdo)
            {

                case 1:
                    return opeInscrip.consultarMatricula();
                case 2:
                    return opeInscrip.agregarMatricula();
                default:
                    return objIn;

            }
        }

        // PUT api/<controller>/5
        public string Put([FromBody] MATRICULA datIn)
        {
            clsOpeMatricula opeInscrip = new clsOpeMatricula();
            opeInscrip.tblMat = datIn;
            return opeInscrip.Modificar();
           
           
        }


    }
}