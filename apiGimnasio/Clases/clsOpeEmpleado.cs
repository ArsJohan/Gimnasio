using apiGimnasio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;

namespace apiGimnasio.Clases
{
    public class clsOpeEmpleado
    {
        //Atributo 
        private readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        public EMPLEADO tblEmpleado { get; set; }

        public IQueryable ListarEmpleados()
        {
            return from tE in oEFR.Set<EMPLEADO>()
                   join tDoc in oEFR.Set<TIPO_DOC>()
                   on tE.codigo_TipoDoc equals tDoc.Codigo_TipoDoc
                   join tEr in oEFR.Set<EMPLEADO>()
                   on tE.id_Empleado equals tEr.Codigo_Empleado
                   orderby tE.nroDoc
                   select new
                   {
                       Codigo = tE.Codigo_Empleado,
                       Nombre = tE.Nombre,
                       Apellido = tE.Apellido,
                       Telefono = tE.Telefono,
                       idTd = tE.codigo_TipoDoc,
                       Tipo_Doc = tDoc.TipoDoc,
                       Nro_doc = tE.nroDoc,
                       Salario = tE.Salario,
                       FechaIng = tE.Fecha_Ingreso,
                       FechaN = tE.Fecha_Nac,
                       Empleado = tE.id_Empleado,
                       Activo = tE.Activo


                   };

        }
        public IQueryable listarXEmpleado(string nroCod)
        {
            return from tE in oEFR.Set<EMPLEADO>()
                   join tDoc in oEFR.Set<TIPO_DOC>()
                    on tE.codigo_TipoDoc equals tDoc.Codigo_TipoDoc
                   join tEr in oEFR.Set<EMPLEADO>()
                   on tE.id_Empleado equals tEr.Codigo_Empleado

                   where tE.nroDoc == nroCod
                   select new
                   {

                       Codigo = tE.Codigo_Empleado,
                       Nombre = tE.Nombre,
                       Apellido = tE.Apellido,
                       Telefono = tE.Telefono,
                       idTd = tE.codigo_TipoDoc,
                       Nro_doc = tE.nroDoc,
                       Salario = tE.Salario,
                       FechaIng = tE.Fecha_Ingreso,
                       FechaN = tE.Fecha_Nac,
                       Empleado = tE.id_Empleado,
                       Activo = tE.Activo


                   };


        }

        public string Agregar()
        {

            var idmax = 0;
            try
            {
                idmax = oEFR.EMPLEADOes.DefaultIfEmpty().Max(r => r == null ? 1 : r.Codigo_Empleado + 1);
            }
            catch
            {

                return $"Error, Hubo un fallo al grabar en el registro: {tblEmpleado.Nombre}, con nroDoc: {tblEmpleado.nroDoc} ";
            }

            tblEmpleado.Codigo_Empleado = idmax;
            try
            {
                oEFR.EMPLEADOes.Add(tblEmpleado);
                oEFR.SaveChanges();
                return $"Registro grabado con éxito: {tblEmpleado.Nombre} , con nroDoc: {tblEmpleado.nroDoc}";

            }
            catch
            {
                return $"Error, hubo fallo al grabar el registro: {tblEmpleado.Codigo_Empleado}, con nroDoc: {tblEmpleado.nroDoc}";

            }


        }
        public string Modificar()
        {
            try
            {
                EMPLEADO tbEmp = oEFR.EMPLEADOes.FirstOrDefault(s => s.nroDoc == tblEmpleado.nroDoc);
                tbEmp.Codigo_Empleado = tblEmpleado.Codigo_Empleado;
                tbEmp.Nombre = tblEmpleado.Nombre;
                tbEmp.codigo_TipoDoc = tblEmpleado.codigo_TipoDoc;
                tbEmp.nroDoc = tblEmpleado.nroDoc;
                tbEmp.Telefono = tblEmpleado.Telefono;
                tbEmp.Salario = tblEmpleado.Salario;
                tbEmp.Fecha_Ingreso = tblEmpleado.Fecha_Ingreso;
                tbEmp.Fecha_Nac = tblEmpleado.Fecha_Nac;
                tbEmp.id_Empleado = tblEmpleado.id_Empleado;
                tbEmp.Activo = tblEmpleado.Activo;

                oEFR.SaveChanges();
                return $"Se actualizo el registro de {tbEmp.nroDoc}";


            }
            catch
            {

                return $"Error, hubo fallo al actualizar registro: {tblEmpleado.Codigo_Empleado}, reintente porfavor";
            }



        }

        public string Eliminar(int codEmp)
        {
            try
            {
                EMPLEADO oEmp = oEFR.EMPLEADOes.FirstOrDefault(x => x.Codigo_Empleado == codEmp);
                if (oEmp == null)
                {
                    return "Error: No se encontró el registro en la base de datos";
                }
                oEFR.EMPLEADOes.Remove(oEmp);
                oEFR.SaveChanges();
                return "Se elimino el registro del artista de la inscripción";
            }
            catch (Exception ex)
            {

                return "Error: " + ex.Message;
            }
        }


    }
}