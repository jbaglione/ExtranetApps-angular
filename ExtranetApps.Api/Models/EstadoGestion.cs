using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public class TipoGestion : Listable, IBindeable
    {
        //public EstadoGestion(DataRow dr, string Id = "Id", string Descripcion = "Descripcion") : base(dr, Id, Descripcion)
        //{
        //}

        public TipoGestion()
        {
        }

        public void Bind(string propertyName, string value)
        {
            if (propertyName == "EstadoId")
                Id = value;
            if (propertyName == "EstadoDescripcion")
                Descripcion = value;
        }
    }
}