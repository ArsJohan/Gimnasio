using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using apiGimnasio.Models;

namespace apiGimnasio.Clases
{
    public class clsOpeMatricula
    {
        //Atributo
        public readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        //Tabla
        public MATRICULA tblMat { get; set; }

        public MATRICULA consultarMatricula()
        {
            try
            {
                var rpta = oEFR.MATRICULAs
                    .Where(x => x.codigo_Matricula == tblMat.codigo_Matricula)
                    .ToList();
                tblMat.codigo_Matricula = Convert.ToInt32(rpta[0].codigo_Matricula);
                tblMat.codigo_Socio = Convert.ToInt32(rpta[0].codigo_Socio);
                tblMat.codigo_Empleado = Convert.ToInt32(rpta[0].codigo_Empleado);
                tblMat.Descripcion = rpta[0].Descripcion;
                tblMat.Precio = Convert.ToDecimal(rpta[0].Precio);
                tblMat.codigo_Empleado = Convert.ToInt32(rpta[0].codigo_Empleado);
                return tblMat;
            }
            catch
            {
                tblMat.codigo_Matricula = 0;
                return tblMat;
            }
        }

        public MATRICULA agregarMatricula()
        {
            int nro = 0;
            nro = oEFR.MATRICULAs.DefaultIfEmpty().Max(x => x == null ? 1 : x.codigo_Matricula + 1);
            if (nro > 0)
            {
                tblMat.codigo_Matricula = nro;
                oEFR.MATRICULAs.Add(tblMat);
                oEFR.SaveChanges();
                return tblMat;
            }
            else
            {
                return tblMat;
            }
        }


        public string Modificar()
        {

            try
            {
                MATRICULA tInsc = oEFR.MATRICULAs.FirstOrDefault(s => s.codigo_Matricula == tblMat.codigo_Matricula);
                tInsc.Descripcion = tblMat.Descripcion;
                tInsc.codigo_Empleado = tblMat.codigo_Empleado;
                oEFR.SaveChanges();
                return "Se actualizo el registro de: " + tInsc.codigo_Matricula;
            }
            catch
            {

                return "Error, hubo fallo al actualizar registro: " + tblMat.codigo_Matricula + ", reintente por favor";
            }


        }
    }
}