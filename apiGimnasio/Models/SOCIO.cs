//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace apiGimnasio.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class SOCIO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SOCIO()
        {
            this.MATRICULAs = new HashSet<MATRICULA>();
            this.TELEFONOes = new HashSet<TELEFONO>();
        }
    
        public int codigo_Socio { get; set; }
        public Nullable<bool> Activo { get; set; }
        public string nroDoc { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Direccion { get; set; }
        public int codigo_TipoDoc { get; set; }
        public int codigo_Ciudad { get; set; }
        public int codigo_Profesion { get; set; }
        public int codigo_Empleado { get; set; }
    
        public virtual CIUDAD CIUDAD { get; set; }
        public virtual EMPLEADO EMPLEADO { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MATRICULA> MATRICULAs { get; set; }
        public virtual PROFESION PROFESION { get; set; }
        public virtual TIPO_DOC TIPO_DOC { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TELEFONO> TELEFONOes { get; set; }
    }
}