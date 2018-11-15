using Microsoft.AspNetCore.Http.Internal;
using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExtranetApps.Api.Models
{
    public class Registracion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 1, TypeName = "serial")]
        public int Id { get; set; }
        public string Usuario { get; set; }
        public DateTime Fecha { get; set; }
        public string Hora { get; set; }
        public string Descripcion { get; set; }
        //[NotMapped]
        public List<Adjunto> Adjuntos { get; set; }
    }
    public class Adjunto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 1, TypeName = "serial")]
        public int Id { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public string FullPath { get; set; }
    }
}