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
        public Clasificacion Clasificacion { get; set; }
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
            //ClienteId = Convert.ToInt64(dr["ClienteId"]);
            //NombreComercial = dr["NombreComercial"].ToString();
            //Rubro = new Rubro(dr, "RubroId", "Rubro");
            //RazonSocial = dr["RazonSocial"].ToString();
            //Cuit = dr["Cuit"].ToString();
            //CondicionIVA = new CondicionIVA(dr, "CondicionIVAId", "CondicionIVA");
            Id = Convert.ToInt64(dr["Id"]);
            Nro = Convert.ToInt64(dr["Nro"]);

            Clasificacion = new Clasificacion(dr, "CondicionIVAId", "CondicionIVA");
            Motivo = new Motivo(dr, "CondicionIVAId", "CondicionIVA");
            Estado = new Estado(dr, "CondicionIVAId", "CondicionIVA");

            //public DateTime Fecha { get; set; }
            //public string Hora { get; set; }
            //public string Titulo { get; set; }
            //public int Clasificacion { get; set; }
            //public int Motivo { get; set; }
            //public string Administrador { get; set; }
            //public short Estado { get; set; } //0 = ,1 = pendiente,2 = Finalizado
            //public DateTime UltFecha { get; set; }
            //public short DiasRta { get; set; }
            //public short Duracion { get; set; }
            //public List<Registracion> Registraciones { get; set; }
        }
    }
}