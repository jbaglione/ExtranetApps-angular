using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public class Estado : Listable, IBindeable
    {
        public Estado(DataRow dr, string Id, string Descripcion) : base(dr, Id, Descripcion)
        {

        }

        public override string Descripcion { get { return this.Id == "0" ? "Nuevo" : this.Id == "1" ? "Pendiente" : this.Id == "2" ? "En curso" : "Finalizado"; } }

        public Estado(string Id)
        {
            base.Id = Id;
        }

        public void Bind(string propertyName, string value)
        {
            if (propertyName == "Estado")
                Id = value;
        }

        public Estado()
        {
        }
    }
}