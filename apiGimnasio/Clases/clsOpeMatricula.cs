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

        public IQueryable consultarMatricula(int cod)
        {
          
            return from tM in oEFR.MATRICULAs
                        join tS in oEFR.SOCIOs 
                        on tM.codigo_Socio equals tS.codigo_Socio
                        where tM.codigo_Matricula == cod
                        select new
                        {
                            tM.codigo_Matricula,
                            tS.codigo_TipoDoc,
                            tS.nroDoc,
                            Socio = tS.Nombre + " " + tS.Apellido,
                            tM.codigo_Empleado,
                            tM.Descripcion,
                            tM.Precio,

                        };
                           

                
            
            
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