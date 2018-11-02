using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ExtranetApps.Api.Models
{
    public abstract class Listable
    {
        [Key]
        public int Id { get; set; }
        public string Descripcion { get; set; }
    }
}