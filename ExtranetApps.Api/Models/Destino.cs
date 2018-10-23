using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExtranetApps.Api.Models
{
    public class Destino
    {
        [Key]
        public int Id { get; set; }
        public string Usuario { get; set; }
        public bool FinalizacionPermiso { get; set; }
    }
}