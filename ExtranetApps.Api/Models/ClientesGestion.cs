using System;

namespace ExtranetApps.Api.Models
{
    public class ClientesGestion
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }

        public TipoGestion TipoGestion { get; set; }
        public string Observaciones { get; set; }
        //greencore.

        public ClienteAdjunto adjunto { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime? FechaRecontacto { get; set; }


        public virtual string FullDescription
        {
            get
            {
                return TipoGestion != null ? string.Format("{0} - {1}", TipoGestion.Descripcion, Observaciones) : Observaciones;
            }
        }
    }

    public class ClienteAdjunto
    {

        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int ClienteGestionId { get; set; }
        //private Panel.AdjuntosClasificaciones clAdjuntoClasificacionId;
        //private Panel.TiposAdjuntos clTipoAdjuntoId;
        //public DateTime FecVencimiento { get; set; }
        //public string Name { get; set; }
        public string Archivo { get; set; }
    }
}
