using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public class Motivo : Listable, IBindeable
    {
        public Motivo(DataRow dr, string Id = "Id", string Descripcion = "Descripcion") : base(dr, Id, Descripcion)
        {
        }

        public Motivo()
        {
        }

        public void Bind(string propertyName, string value)
        {
            if (propertyName == "MotivoId")
                Id = value;
            if (propertyName == "Motivo")
                Descripcion = value;
        }
    }
}