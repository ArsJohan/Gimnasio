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
        // GET api/<controller>/5
        public IQueryable Get(int codMat)
        {
            clsOpeMatricula opeInscrip = new clsOpeMatricula();
            return opeInscrip.consultarMatricula(codMat);
        }


        // POST api/<controller>
        public MATRICULA Post([FromBody] MATRICULA objIn, int cmdo)
        {
            clsOpeMatricula opeMat = new clsOpeMatricula();
            opeMat.tblMat = objIn;
            switch (cmdo)
            {

                case 1:
                    return opeMat.agregarMatricula();
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