using System;
using  System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace ExtranetApps.Api.Models
{
    public class ClientesPotenciales
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 1, TypeName = "serial")]
        public long ClienteId { get; set; }
        public string NombreComercial { get; set; }

        private Rubro rubroObj;
        public Rubro RubroObj {
            get
            {
                if (rubroObj == null)
                    return new Rubro { Descripcion = this.Rubro, ID = Convert.ToInt32(this.RubroId) };

                return rubroObj;
            }
            set
            {
                rubroObj = value;
            }
        }

        public string RubroId { get; set; }
        public string Rubro { get; set; }

        public string RazonSocial { get; set; }
        public string Cuit { get; set; }

        public long CuitNumber
        {
            get
            {
                if (Cuit == null) Cuit = "";
                string cuitSinGuion = Cuit.Replace("-", "");
                string cuitNumber = Regex.Match(cuitSinGuion, @"\d+").Value;
                return string.IsNullOrEmpty(cuitNumber) ? 0 : Convert.ToInt64(cuitNumber);
            }
        }

        //public CondicionIVA CondicionIVA { get; set; }
        private CondicionIVA condicionIVAObj;
        public CondicionIVA CondicionIVAObj
        {
            get
            {
                if (condicionIVAObj == null)
                    return new CondicionIVA { Descripcion = this.CondicionIVA, ID = this.CondicionIVAId };

                return condicionIVAObj;
            }
            set
            {
                condicionIVAObj = value;
            }
        }

        public string CondicionIVAId { get; set; }
        public string CondicionIVA { get; set; }

        public string Latitud { get; set; }
        public string Longitud { get; set; }
        public string Domicilio { get; set; }
        public string Calle { get; set; }
        public int Altura { get; set; }
        public int Piso { get; set; }
        public string Depto { get; set; }
        public string Referencia { get; set; }
        public string EntreCalle1 { get; set; }
        public string EntreCalle2 { get; set; }
        public string CodigoPostal { get; set; }

        //public Localidad Localidad { get; set; }
        //public CondicionIVA CondicionIVA { get; set; }
        private Localidad localidad;
        public Localidad LocalidadObj
        {
            get
            {
                if (localidad == null)
                    return new Localidad { LocalidadDescripcion = this.Localidad};

                return localidad;
            }
            set
            {
                localidad = value;
            }
        }
        public string Localidad { get; set; }

        public int Estado { get; set; } //TODO: potencial = 1, activo = 2, inactivo = 3
        public string CredencialID { get; set; }//TODO: potencial no tienen codigocliente
    }

    public class Rubro: IUseAlias
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }

        public string GetAlias(string key)
        {
            return new Dictionary<string, string> {
                    { "RubroId", "ID" },
                    { "Rubro", "Descripcion" },
                    }[key];
        }
    }

    public class CondicionIVA: IUseAlias
    {
        public string ID { get; set; }
        public string Descripcion { get; set; }

        public string GetAlias(string key)
        {
            return new Dictionary<string, string> {
                    { "CondicionIVAId", "ID" },
                    { "CondicionIVA", "Descripcion" },
                    }[key];
        }
    }

    public class Localidad: IUseAlias
    {
        public string LocalidadDescripcion { get; set; }
        public string LocalidadId { get; set; }
        public string PartidoId { get; set; }

        public string GetAlias(string key)
        {
            return new Dictionary<string, string> {
                    { "Localidad", "LocalidadDescripcion" },
                    }[key];
        }
    }
}