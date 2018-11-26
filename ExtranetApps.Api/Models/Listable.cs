using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public abstract class Listable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 1, TypeName = "serial")]
        public string Id { get; set; }
        public virtual string Descripcion { get; set; }

        public Listable()
        {
        }

        public Listable(DataRow dr, string id = "Id", string descripcion = "Descripcion")
        {
            if (dr.Table.Columns.Contains(id) && dr[id] != DBNull.Value)
                this.Id = dr[id].ToString();

            if (dr.Table.Columns.Contains(descripcion) && dr[descripcion] != DBNull.Value)
                this.Descripcion = dr[descripcion].ToString();
        }
    }
}