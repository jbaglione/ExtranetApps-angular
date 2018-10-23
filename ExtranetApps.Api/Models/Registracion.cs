using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExtranetApps.Api.Models
{
    public class Registracion
    {
        [Key]
        public int Id { get; set; }
        public string Usuario { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime Hora { get; set; }
        public short Clasificacion { get; set; }
        public string Descripcion { get; set; }
        public string Adjunto { get; set; }
        
    }
}