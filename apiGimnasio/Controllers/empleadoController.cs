using apiGimnasio.Clases;
using apiGimnasio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace apiGimnasio.Controllers
{
    public class empleadoController : ApiController
    {
        // GET api/<controller>
        public IQueryable Get()
        {
            clsOpeEmpleado opeEmpleado = new clsOpeEmpleado();
            return opeEmpleado.ListarEmpleados();
        }

        // GET api/<controller>/5
        public IQueryable Get(string codEmp)
        {
            clsOpeEmpleado opeEmpleado = new clsOpeEmpleado();
            return opeEmpleado.listarXEmpleado(codEmp);
        }

        // POST api/<controller>
        public string Post([FromBody] EMPLEADO tblEmp)
        {
            clsOpeEmpleado opeEmpleado = new clsOpeEmpleado();
            opeEmpleado.tblEmpleado = tblEmp;
            return opeEmpleado.Agregar();
        }

        // PUT api/<controller>/5
        public string Put([FromBody] EMPLEADO tblEmp)
        {
            clsOpeEmpleado opeEmpleado = new clsOpeEmpleado();
            opeEmpleado.tblEmpleado = tblEmp;
            return opeEmpleado.Modificar();
        }

        // DELETE api/<controller>/5
        public string Delete(int codEmp)
        {
            clsOpeEmpleado opeEmpleado = new clsOpeEmpleado();
            return opeEmpleado.Eliminar(codEmp);
        }
    }
}