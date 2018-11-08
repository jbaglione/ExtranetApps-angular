using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExtranetApps.Api.Models
{
    public class Registracion
    {
        [Key]
        public int Id { get; set; }
        public string Usuario { get; set; }
        public DateTime Fecha { get; set; }
        public string Hora { get; set; }
        //public string Clasificacion { get; set; } //Borrrar, no hace falta que lo maneje el usuario comun.
        public string Descripcion { get; set; }
        [NotMapped]
        public List<string> Adjuntos { get; set; }
        
    }
}