using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public class Estado : Listable
    {
        public Estado(DataRow dr, string Id, string Descripcion) : base(dr,Id, Descripcion)
        {
        }

        public Estado()
        {
        }
    }
}