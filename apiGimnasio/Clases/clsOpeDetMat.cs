using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using apiGimnasio.Models;

namespace apiGimnasio.Clases
{
    public class clsOpeDetMat
    {
        //Atributo
        public readonly GIMNASIOEntities oEFR = new GIMNASIOEntities();

        //Tabla
        public DETALLE_MATRICULA tblDetMat { get; set; }


        public IQueryable llenarTabla(int cod)
        {
            return from tD in oEFR.Set<DETALLE_MATRICULA>()
                   join tC in oEFR.Set<CLASE>()
                    on tD.codigo_Clase equals tC.codigo_Clase
                   join tM in oEFR.Set<MONITOR>()
                    on tC.codigo_Monitor equals tM.codigo_Monitor
                   join tSal in oEFR.Set<SALA>()
                    on tC.codigo_Sala equals tSal.codigo_Sala
                   join tMa in oEFR.Set<MATRICULA>()
                    on tD.codigo_Matricula equals tMa.codigo_Matricula
                   join tS in oEFR.Set<SOCIO>()
                    on tMa.codigo_Socio equals tS.codigo_Socio
                   join tTDc in oEFR.Set<TIPO_DOC>()
                    on tS.codigo_TipoDoc equals tTDc.Codigo_TipoDoc

                   where tD.codigo_Matricula == cod
                   orderby tD.codigo_DetallesMatr
                   select new
                   {
                       Quitar = "<a class='btn btn-info btn-sm' href=''><i class='fas fa-trash-alt'></i>Quitar</a>",
                       Codigo = tD.codigo_DetallesMatr,
                       FechaIn = tD.Fecha_Inicio,
                       FechaFin = tD.Fecha_Fin,
                       idClase = tC.codigo_Clase,
                       Clase = tC.Descripcion,
                       idHora = tC.codigo_hora,
                       idDia = tC.codigo_Dia,
                       idMatricula = tD.codigo_Matricula,
                       Socio = tS.Nombre + " " + tS.Apellido,
                       idTipDoc = tTDc.TipoDoc,
                       idEmp = tM.codigo_Empleado,


                   };


        }


        public DETALLE_MATRICULA Agregar()
        {
            int cod = oEFR.DETALLE_MATRICULA.DefaultIfEmpty().Max(r => r == null ? 1 : r.codigo_DetallesMatr + 1);
            if (cod > 0)
            {
                tblDetMat.codigo_DetallesMatr = cod;
                oEFR.DETALLE_MATRICULA.Add(tblDetMat);
                oEFR.SaveChanges();
                return tblDetMat;

            }
            else
            {
                return tblDetMat;
            }
        }


        public string Eliminar(int codDetMat)
        {
            try
            {
                DETALLE_MATRICULA oDI = oEFR.DETALLE_MATRICULA.FirstOrDefault(x => x.codigo_DetallesMatr == codDetMat);
                if (oDI == null)
                {
                    return "Error: No se encontró el registro en la base de datos";
                }
                oEFR.DETALLE_MATRICULA.Remove(oDI);
                oEFR.SaveChanges();
                return "Se elimino el registro del socio de la matricula";
            }
            catch (Exception ex)
            {

                return "Error: " + ex.Message;
            }
        }


    }
}
