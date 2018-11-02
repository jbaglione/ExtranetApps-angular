using System;
using  System.Collections.Generic;

namespace ExtranetApps.Api.Models
{
    public class Hallazgo
    {
        public int Id { get; set; }
        public int Nro { get; set; }
        public DateTime Fecha { get; set; }
        public string Hora { get; set; }
        public string Titulo { get; set; }
        public int Motivo { get; set; }
        public string Administrador { get; set; }
        public short Estado { get; set; } //0 = ,1 = pendiente,2 = Finalizado
        public DateTime UltFecha { get; set; }
        public short DiasRta { get; set; }
        public short Duracion { get; set; }
        public List<Registracion> Registraciones { get; set; }
        public List<Destino> Destinos { get; set; }
    }
}