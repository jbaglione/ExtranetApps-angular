using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public class Bitacora: IUseAlias
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 1, TypeName = "serial")]
        public long Id { get; set; }
        public long Nro { get; set; }
        public DateTime Fecha { get; set; }
        public string Hora { get; set; } //Borrar->se toma la primera registracion.
        public string Titulo { get; set; }
        public Motivo Motivo { get; set; }
        public string Administrador { get; set; }
        public Estado Estado { get; set; }
        public DateTime UltFecha { get; set; }
        public string UltHora { get; set; }
        public short DiasRta { get; set; } //=> Calcular
        public short Duracion { get; set; } //=> Calcular
        public List<Registracion> Registraciones { get; set; } //=> GetRegistracionesByBitacora

        public Bitacora()
        {
        }

        public string GetAlias(string key)
        {
            return new Dictionary<string, string> {
                    { "NumeroId", "Nro" },
                    { "FecBitacora", "Fecha" },
                    { "ultFecha", "UltFecha" },
                    { "ultHora", "UltHora" },
                    { "FecHorIngreso", "Hora" }
                    }[key];
        }

        public DateTime UltFechaHora
        {
            get
            {
                return UltFecha + TimeSpan.Parse(UltHora??"00:00");
            }
        }
    }
}