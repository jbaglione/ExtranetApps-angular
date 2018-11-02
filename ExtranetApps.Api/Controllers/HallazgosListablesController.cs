using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ExtranetApps.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallazgosListablesController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;

        public HallazgosListablesController(ExtranetAppsContext context)
        {
            _context = context;

            if (_context.MotivoItems.Count() == 0)
            {
                _context.MotivoItems.Add(new Motivo { Id = 1, Descripcion = "Motivo 1", });
                _context.MotivoItems.Add(new Motivo { Id = 2, Descripcion = "Motivo 2", });
                _context.MotivoItems.Add(new Motivo { Id = 3, Descripcion = "Motivo 3", });
                _context.MotivoItems.Add(new Motivo { Id = 4, Descripcion = "Motivo 4", });
                _context.MotivoItems.Add(new Motivo { Id = 5, Descripcion = "Motivo 5", });
                _context.SaveChanges();
            }
            if (_context.EstadoItems.Count() == 0)
            {
                _context.EstadoItems.Add(new Estado { Id = 1, Descripcion = "Estado 1", });
                _context.EstadoItems.Add(new Estado { Id = 2, Descripcion = "Estado 2", });
                _context.EstadoItems.Add(new Estado { Id = 3, Descripcion = "Estado 3", });
                _context.EstadoItems.Add(new Estado { Id = 4, Descripcion = "Estado 4", });
                _context.EstadoItems.Add(new Estado { Id = 5, Descripcion = "Estado 5", });
                _context.SaveChanges();
            }
            if (_context.ClasificacionItems.Count() == 0)
            {
                _context.ClasificacionItems.Add(new Clasificacion { Id = 1, Descripcion = "Clasificacion 1", });
                _context.ClasificacionItems.Add(new Clasificacion { Id = 2, Descripcion = "Clasificacion 2", });
                _context.ClasificacionItems.Add(new Clasificacion { Id = 3, Descripcion = "Clasificacion 3", });
                _context.ClasificacionItems.Add(new Clasificacion { Id = 4, Descripcion = "Clasificacion 4", });
                _context.ClasificacionItems.Add(new Clasificacion { Id = 5, Descripcion = "Clasificacion 5", });
                _context.SaveChanges();
            }
        }

        [Route("GetMotivos")]
        [HttpGet(Name = "GetMotivos")]
        public ActionResult<List<Motivo>> GetMotivos()
        {
            return _context.MotivoItems.ToList();
        }

        [Route("GetEstados")]
        [HttpGet(Name = "GetEstados")]
        public ActionResult<List<Estado>> GetEstados()
        {
            return _context.EstadoItems.ToList();
        }

        [Route("GetClasificaciones")]
        [HttpGet(Name = "GetClasificaciones")]
        public ActionResult<List<Clasificacion>> GetClasificaciones()
        {
            return _context.ClasificacionItems.ToList();
        }
    }
}
