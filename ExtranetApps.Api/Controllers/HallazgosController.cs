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
    public class HallazgosController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;

        public HallazgosController(ExtranetAppsContext context)
        {
            _context = context;

            if (_context.HallazgoItems.Count() == 0)
            {
                _context.HallazgoItems.Add(new Hallazgo
                {
                    Id = 1,
                    Nro = 1,
                    Fecha = DateTime.ParseExact("20/10/2018", "dd/MM/yyyy", CultureInfo.InvariantCulture),
                    Hora = DateTime.Now.ToShortTimeString(),
                    Titulo = "Primer hallazgo prueba",
                    Clasificacion = 1,
                    Motivo = 2,
                    Administrador = "Deberia ser un Id Administrador",
                    Estado = 1,
                    UltFecha = DateTime.Now,
                    DiasRta = 1,
                    Duracion = 1,
                    Registraciones = new List<Registracion> {
                        new Registracion {
                            Id = 1,
                            Usuario = "Usuario Reg 1 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now,
                            Clasificacion = 1,
                            Descripcion = "Descripcion de Registraciones, Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto","C:\\RutaDeAdjunto_B" }
                        },new Registracion {
                            Id = 2,
                            Usuario = "Usuario Reg 2 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now,
                            Clasificacion = 2,
                            Descripcion = "Descripcion de Registraciones 2, Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto2"}
                        }},
                    Destinos = new List<Destino> {
                        new Destino{
                            Id = 1,
                            Usuario = "Usuario Destino 1 (ID?)",
                            FinalizacionPermiso = true
                        } }
                });
                //_context.HallazgoItems.Add(new Hallazgo
                //{
                //    Id = 2,
                //    Nro = 2,
                //    Fecha = DateTime.ParseExact("20/11/2018", "dd/MM/yyyy", CultureInfo.InvariantCulture),
                //    Hora = DateTime.Now.ToShortTimeString(),
                //    Titulo = "Segundo hallazgo prueba",
                //    Motivo = 4,
                //    Administrador = "Deberia ser un Id Administrador",
                //    Estado = 2,
                //    UltFecha = DateTime.Now,
                //    DiasRta = 1,
                //    Duracion = 1,
                //    Registraciones = new List<Registracion> {
                //        new Registracion {
                //            Id = 2,
                //            Usuario = "Usuario Registracion 1 (Id?)",
                //            Fecha = DateTime.Now,
                //            Hora =  DateTime.Now,
                //            Clasificacion = 1,
                //            Descripcion = "Descripcion de Registraciones, Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion",
                //            Adjunto = "C:\\RutaDeAdjunto"
                //        },new Registracion {
                //            Id = 3,
                //            Usuario = "Usuario Registracion 2 (Id?)",
                //            Fecha = DateTime.Now,
                //            Hora =  DateTime.Now,
                //            Clasificacion = 2,
                //            Descripcion = "Descripcion de Registraciones 2, Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2",
                //            Adjunto = "C:\\RutaDeAdjunto2"
                //        }},
                //    Destinos = new List<Destino> {
                //        new Destino{
                //            Id = 2,
                //            Usuario = "Usuario Destino 1 (ID?)",
                //            FinalizacionPermiso = true
                //        } }
                //});
                _context.SaveChanges();
            }
        }
    
        [HttpGet]
        public ActionResult<List<Hallazgo>> Get()
        {
            return _context.HallazgoItems.ToList();
        }

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

            //FIX error EF Core in save adjuntos
            item.Registraciones = new List<Registracion> {
                        new Registracion {
                            Id = 1,
                            Usuario = "Usuario Reg 1 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now,
                            Clasificacion = 1,
                            Descripcion = "Descripcion de Registraciones, Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto","C:\\RutaDeAdjunto_B" }
                        },new Registracion {
                            Id = 2,
                            Usuario = "Usuario Reg 2 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now,
                            Clasificacion = 2,
                            Descripcion = "Descripcion de Registraciones 2, Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto2"}
                        }};

            return item;
        }
    }
    
}

//[Route("api/[controller]")] /* this is the defualt prefix for all routes, see line 20 for overridding it */
//public class ValuesController : Controller
//{
//    [HttpGet] // this api/Values
//    public string Get()
//    {
//        return string.Format("Get: simple get");
//    }

//    [Route("GetByAdminId")] /* this route becomes api/[controller]/GetByAdminId */
//    public string GetByAdminId([FromQuery] int adminId)
//    {
//        return $"GetByAdminId: You passed in {adminId}";
//    }

//    [Route("/someotherapi/[controller]/GetByMemberId")] /* note the / at the start, you need this to override the route at the controller level */
//    public string GetByMemberId([FromQuery] int memberId)
//    {
//        return $"GetByMemberId: You passed in {memberId}";
//    }

//    [HttpGet]
//    [Route("IsFirstNumberBigger")] /* this route becomes api/[controller]/IsFirstNumberBigger */
//    public string IsFirstNumberBigger([FromQuery] int firstNum, int secondNum)
//    {
//        if (firstNum > secondNum)
//        {
//            return $"{firstNum} is bigger than {secondNum}";
//        }
//        return $"{firstNum} is NOT bigger than {secondNum}";
//    }
//}