using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace ExtranetApps.Api.Models
{
    public class Clasificacion : Listable
    {
        //    Enum motBitacorasClasificaciones
        //    hTodos = -1
        //    hOperativo = 0 ==> Bitacoras
        //    hAuditoriaMedica = 1
        //    hSoporteTecnico = 2 ==> Hallazgos
        //End Enum
        public Clasificacion(DataRow dr, string Id, string Descripcion) : base(dr, Id, Descripcion)
        {
        }

        public Clasificacion()
        {
        }
    }
}