using Microsoft.AspNetCore.Http.Internal;
using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

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

        public Registracion(DataRow dr)
        {

            Id = Convert.ToInt32(dr["ID"].ToString().Split("||")[1]);
            Usuario = dr["Usuario"].ToString();//UsuarioId
            Fecha = Convert.ToDateTime(dr["regFecha"]);
            Hora = dr["regHora"].ToString();
            Descripcion = dr["Detalle"].ToString();
            //Adjuntos = dr["Adjuntos"].ToString();new-->Adjunto
        }
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