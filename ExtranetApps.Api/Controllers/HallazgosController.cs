using  System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ExtranetApps.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Microsoft.AspNetCore.Cors;
using ShamanClases;
using NLog;
using System.Data;

namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallazgosController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;

        private Logger logger = LogManager.GetCurrentClassLogger();

        public HallazgosController(ExtranetAppsContext context)
        {
            try
            {
                _context = context;

                if (_context.HallazgoItems.Count() == 0)
                {
                    _context.HallazgoItems.Add(new Hallazgo
                    {
                        Id = 1,
                        Nro = 1,
                        Fecha = DateTime.ParseExact("20/10/2018", "dd/MM/yyyy", CultureInfo.InvariantCulture),
                        //"20/10/2018",//
                        Clasificacion = _context.ClasificacionItems.Select(x => x.Id == 2) as Clasificacion,
                        Hora = DateTime.Now.ToShortTimeString(),
                        Titulo = "Primer hallazgo prueba",
                        Administrador = "Deberia ser un Id Administrador",
                        UltFecha = DateTime.Now,
                        DiasRta = 1,
                        Duracion = 1,
                        Registraciones = new List<Registracion> {
                        new Registracion {
                            Id = 1,
                            Usuario = "Usuario Reg 1 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now.ToShortTimeString(),
                            Descripcion = "Descripcion de Registraciones, Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto","C:\\RutaDeAdjunto_B" }
                        },new Registracion {
                            Id = 2,
                            Usuario = "Usuario Reg 2 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =   DateTime.Now.ToShortTimeString(),
                            Descripcion = "Descripcion de Registraciones 2, Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto2"}
                        }},
                    });
                    _context.SaveChanges();
                }

                //DataRow dr = CreateFakeDataTable();
                //var item = _context.HallazgoItems.FirstOrDefault();
                //item.Clasificacion = new Clasificacion(dr, "ClasificacionID", "ClasificacionDesc");
                //item.Motivo = new Motivo(dr, "MotivoID", "MotivoDesc");
                //item.Estado = new Estado(dr, "EstadoID", "EstadoDesc");
                //item.Registraciones = new List<Registracion> {
                //        new Registracion {
                //            Id = 1,
                //            Usuario = "Usuario Reg 1 (Id?)",
                //            Fecha = DateTime.Now,
                //            Hora =  DateTime.Now.ToShortTimeString(),
                //            Descripcion = "Descripcion de Registraciones, Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion",
                //            Adjuntos = new List<string>{"C:\\RutaDeAdjunto","C:\\RutaDeAdjunto_B" }
                //        },new Registracion {
                //            Id = 2,
                //            Usuario = "Usuario Reg 2 (Id?)",
                //            Fecha = DateTime.Now,
                //            Hora =  DateTime.Now.ToShortTimeString(),
                //            Descripcion = "Descripcion de Registraciones 2, Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2",
                //            Adjuntos = new List<string>{"C:\\RutaDeAdjunto2"}
                //        }};


                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        private DataRow CreateFakeDataTable()
        {
            DataTable usersTable = new DataTable();

            usersTable.Columns.Add("ClasificacionID");
            usersTable.Columns.Add("ClasificacionDesc");

            usersTable.Columns.Add("MotivoID");
            usersTable.Columns.Add("MotivoDesc");

            usersTable.Columns.Add("EstadoID");
            usersTable.Columns.Add("EstadoDesc");

            DataRow userRow = usersTable.NewRow();

            //userRow["ClasificacionID"] = 2;
            userRow["ClasificacionDesc"] = "Hallazgos";

            userRow["MotivoID"] = 2;
            userRow["MotivoDesc"] = "Motivo 2";

            userRow["EstadoID"] = "4";
            userRow["EstadoDesc"] = "Estado 4";

            //usersTable.Rows.Add(userRow);

            return userRow;
        }

        [HttpGet]
        [DisableCors]
        public ActionResult<List<Hallazgo>> Get()
        {
            List<Hallazgo> lstHallazgos = new List<Hallazgo>();
            Hallazgo item = _context.HallazgoItems.FirstOrDefault();

            lstHallazgos = _context.HallazgoItems.ToList();

            DataRow dr = CreateFakeDataTable();
            item.Clasificacion = new Clasificacion(dr, "ClasificacionID", "ClasificacionDesc");
            item.Motivo = new Motivo(dr, "MotivoID", "MotivoDesc");
            item.Estado = new Estado(dr, "EstadoID", "EstadoDesc");
            //item.Registraciones = new List<Registracion>
            
            return lstHallazgos;
        }

        //[HttpGet]
        //[DisableCors]
        //public ActionResult<List<Hallazgo>> Get()
        //{
            
        //    List<Hallazgo> lstHallazgos = new List<Hallazgo>();
        //    try
        //    {
        //        //< appSettings >
        //        //< add key = "cacheNameSpace" value = "DESA" />< !--value = "SHAMAN"-- >   
        //        //< add key = "cachePort" value = "1972" />
        //        //< add key = "cacheServer" value = "200.49.156.125" />         
        //        //< add key = "cacheShamanAplicacion" value = "EMERGENCIAS" />            
        //        //< add key = "cacheShamanCentro" value = "1" />
        //        //< add key = "cacheShamanUser" value = "JOB" />
        //        //< add key = "tangoEmpresaId" value = "3" />
        //        //</ appSettings >
        //        //if (objConexion.Iniciar(appSettings.Get("cacheServer"), int.Parse(appSettings.Get("cachePort")), appSettings.Get("cacheNameSpace"), appSettings.Get("cacheShamanAplicacion"), appSettings.Get("cacheShamanUser"), int.Parse(appSettings.Get("cacheShamanCentro")), true))
                
        //            EmergencyC.Bitacoras objBitacoras = new EmergencyC.Bitacoras();
        //            DataTable dt = objBitacoras.GetHallazgos(29);

        //            foreach (DataRow r in dt.Rows)
        //                lstHallazgos.Add(new Hallazgo(r));

        //            return lstHallazgos;
        //        //return _context.HallazgoItems.ToList();

        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(ex);
        //    }
        //    return null;
        //}

        [HttpGet("{id}", Name = "GetHallazgo")]
        [DisableCors]
        public ActionResult<Hallazgo> GetHallazgoById(int id)
        {

            var item = _context.HallazgoItems
                //.Include(h => h.Destinos)
                .Include(h => h.Registraciones)
                .AsQueryable().Where(x => x.Id == id).FirstOrDefault();



            //var item = _context.HallazgoItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            //FIX error EF Core in save adjuntos
            if (item.Id == 1)
            {
                item.Registraciones = new List<Registracion> {
                        new Registracion {
                            Id = 1,
                            Usuario = "Usuario Reg 1 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now.ToShortTimeString(),
                            Descripcion = "Descripcion de Registraciones, Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto","C:\\RutaDeAdjunto_B" }
                        },new Registracion {
                            Id = 2,
                            Usuario = "Usuario Reg 2 (Id?)",
                            Fecha = DateTime.Now,
                            Hora =  DateTime.Now.ToShortTimeString(),
                            Descripcion = "Descripcion de Registraciones 2, Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2",
                            Adjuntos = new List<string>{"C:\\RutaDeAdjunto2"}
                        }};
                DataRow dr = CreateFakeDataTable();
                dr["ClasificacionID"] = 2;
                item.Clasificacion = new Clasificacion(dr, "ClasificacionID", "ClasificacionDesc");
                item.Motivo = new Motivo(dr, "MotivoID", "MotivoDesc");
                item.Estado = new Estado(dr, "EstadoID", "EstadoDesc");
            }


            return item;
        }


        //public void Post([FromBody] dynamic newHallazgo)
        //public void Post([FromBody]  prueba newHallazgo)
        [HttpPost]
        [DisableCors]
        public void Post([FromBody] Hallazgo newHallazgo)
        {
            var lastHallazgos = _context.HallazgoItems.Include(h => h.Registraciones).ToList().Last();
            if(lastHallazgos.Registraciones.Count > 0)
            {
                newHallazgo.Registraciones.ToList().Last().Id = lastHallazgos.Registraciones.ToList().Last().Id + 1;
            }

            //newHallazgo.
            if (newHallazgo.Id == 0)
            {
                
                newHallazgo.Id = lastHallazgos.Id + 1;
                newHallazgo.Nro = lastHallazgos.Nro + 1;
                newHallazgo.Hora = DateTime.Now.ToShortTimeString();
                _context.HallazgoItems.Add(newHallazgo);
            }
            else
            {
                _context.HallazgoItems.First(a => a.Id == newHallazgo.Id).Registraciones = newHallazgo.Registraciones;
                _context.HallazgoItems.Update(_context.HallazgoItems.First(a => a.Id == newHallazgo.Id));
            }
            
            _context.SaveChanges();
        }
    }

    public class prueba
    {
        public string ID { get; set; }
        public string Descripcion { get; set; }
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