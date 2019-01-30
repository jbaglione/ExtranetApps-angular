using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExtranetApps.Api.Models
{
    public class TiposAdjuntosMin
    {
        public decimal ID { get; set; }
        public string Extension { get; set; }

        public static string GetTipoAdjuntoId(string extension, string connectionString = null)
        {
            List<TiposAdjuntosMin> TipoAdjuntos = modGenerics.GetList<TiposAdjuntosMin>(new Panel.TiposAdjuntos().CacheClassController, "GetTipoAdjuntos", false, connectionString);

            return TipoAdjuntos.Where(x => x.Extension == extension.Replace(".", "")).FirstOrDefault().ID.ToString();
        }
    }
}
