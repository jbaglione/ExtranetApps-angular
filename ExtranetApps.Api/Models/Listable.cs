using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public abstract class Listable
    {
        [Key]
        public int Id { get; set; }
        public string Descripcion { get; set; }

        public Listable()
        {
        }

        public Listable(DataRow dr, string id = "Id", string descripcion = "Descripcion")
        {
            if (dr.Table.Columns.Contains(id) && dr[id] != DBNull.Value)
                this.Id = Convert.ToInt32(dr[id]);

            if (dr.Table.Columns.Contains(descripcion) && dr[descripcion] != DBNull.Value)
                this.Descripcion = dr[descripcion].ToString();
        }
    }
}