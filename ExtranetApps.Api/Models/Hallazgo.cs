using System;
using  System.Collections.Generic;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public class Hallazgo
    {
        public long Id { get; set; }
        public long Nro { get; set; }
        public DateTime Fecha { get; set; }
        public string Hora { get; set; }
        public string Titulo { get; set; }
        public Motivo Motivo { get; set; }
        public string Administrador { get; set; }
        public Estado Estado { get; set; } //0 = ,1 = pendiente,2 = Finalizado
        public DateTime UltFecha { get; set; }
        public short DiasRta { get; set; } //=> Calcular
        public short Duracion { get; set; } //=> Calcular
        public List<Registracion> Registraciones { get; set; } //=> GetRegistracionesByBitacora
        //public List<Destino> Destinos { get; set; }
        public Hallazgo()
        {
        }
        public Hallazgo (DataRow dr)
        {

            Id = Convert.ToInt64(dr["Id"]);
            Nro = Convert.ToInt64(dr["Nro"]);

            Motivo = new Motivo(dr, "CondicionIVAId", "CondicionIVA");
            Estado = new Estado(dr, "CondicionIVAId", "CondicionIVA");
            //...
        }
    }
}