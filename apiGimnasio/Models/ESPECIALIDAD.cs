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
    
    public partial class ESPECIALIDAD
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ESPECIALIDAD()
        {
            this.ESPECI_MONI = new HashSet<ESPECI_MONI>();
        }
    
        public int codigo_Especialidad { get; set; }
        public string Especialidad1 { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ESPECI_MONI> ESPECI_MONI { get; set; }
    }
}
