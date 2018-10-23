using  System;
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
    public class ExtranetAppsController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;

        public ExtranetAppsController(ExtranetAppsContext context)
        {
            _context = context;

            if (_context.HallazgoItems.Count() == 0)
            {
                //if (_context.DestinoItems.Count() == 0)
                //{
                //    _context.DestinoItems.Add(new Destino
                //    {
                //        Id = 1,
                //        Usuario = "Usuario Destino 1 (ID?)",
                //        FinalizacionPermiso = true
                //    });
                //    _context.SaveChanges();
                //}
                    // Create a new HallazgoItems if collection is empty,
                    // which means you can't delete all HallazgoItemss.
                _context.HallazgoItems.Add(new Hallazgo
                {
                    Id = 1,
                    Nro = 1,
                    Fecha = DateTime.ParseExact("20/10/2018", "dd/MM/yyyy", CultureInfo.InvariantCulture),
                    Hora = DateTime.Now.ToShortTimeString(),
                    Titulo = "Primer hallazgo prueba",
                    Motivo = "Deberia ser un Id Motivo",
                    Administrador = "Deberia ser un Id Administrador",
                    Estado = 1,
                    UltFecha = DateTime.Now,
                    DiasRta = 1,
                    Duracion = 1,
                    Registraciones = new List<Registracion> {
                        new Registracion {
                            Id = 1,
                            Usuario = "Usuario Registracion 1 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now,
                            Clasificacion = 1,
                            Descripcion = "Descripcion de Registraciones",
                            Adjunto = "C:\\RutaDeAdjunto"
                        },
                    new Registracion {
                            Id = 2,
                            Usuario = "Usuario Registracion 2 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now,
                            Clasificacion = 2,
                            Descripcion = "Descripcion de Registraciones",
                            Adjunto = "C:\\RutaDeAdjunto2"
                        }},
                    Destinos = new List<Destino> {
                        new Destino{
                            Id = 1,
                            Usuario = "Usuario Destino 1 (ID?)",
                            FinalizacionPermiso = true
                        } }
                });

                _context.SaveChanges();
            }
        }
    
        [HttpGet]
        public ActionResult<List<Hallazgo>> Get()
        {
            return _context.HallazgoItems.ToList();
        }

        //[HttpGet("{id}", Name = "GetHallazgo")]
        //public ActionResult<Hallazgo> GetHallazgoById(int id)
        //{

        //    var item = _context.HallazgoItems
        //        .Include(h => h.Destinos)
        //        .Include(h => h.Registraciones)
        //        .AsQueryable().Where(x => x.Id == id).FirstOrDefault();


        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    return item;
        //}

        [HttpGet("{id}", Name = "GetHallazgo")]
        public ActionResult<Hallazgo> GetHallazgoById(int id)
        {

            var item = _context.HallazgoItems
                .Include(h => h.Destinos)
                .Include(h => h.Registraciones)
                .AsQueryable().Where(x => x.Id == id).FirstOrDefault();

            //var item = _context.HallazgoItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        //[HttpGet("{id}", Name = "GetTestId")]
        //public ActionResult<JsonResult> GetTestId(int id) //--> OK
        //{
        //    return Content("{ \"ID\":\"1\", \"Descripcion\":\"New York\" }", "application/json");
        //}

    }

    
}