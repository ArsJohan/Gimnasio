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
    
    public partial class MONITOR
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MONITOR()
        {
            this.CLASEs = new HashSet<CLASE>();
            this.ESPECI_MONI = new HashSet<ESPECI_MONI>();
        }
    
        public int codigo_Monitor { get; set; }
        public Nullable<bool> Activo { get; set; }
        public string nroDoc { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public string Experiencia { get; set; }
        public int codigo_TipoDoc { get; set; }
        public int codigo_Empleado { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CLASE> CLASEs { get; set; }
        public virtual EMPLEADO EMPLEADO { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ESPECI_MONI> ESPECI_MONI { get; set; }
        public virtual TIPO_DOC TIPO_DOC { get; set; }
    }
}