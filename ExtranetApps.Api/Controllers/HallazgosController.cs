using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ExtranetApps.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Microsoft.AspNetCore.Cors;
//using ShamanClases;
using NLog;
using System.Data;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.Extensions.Configuration;

namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallazgosController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;
        public IConfiguration Configuration { get; }

        private Logger logger = LogManager.GetCurrentClassLogger();


        
        public HallazgosController(ExtranetAppsContext context, IConfiguration configuration)
        {

            _context = context;
            Configuration = configuration;

            //try
            //{
            //    if (_context.HallazgoItems.Count() == 0)
            //    {
            //        _context.HallazgoItems.Add(new Hallazgo
            //        {
            //            Id = 1,
            //            Nro = 1,
            //            Fecha = DateTime.ParseExact("20/10/2018", "dd/MM/yyyy", CultureInfo.InvariantCulture),
            //            Hora = DateTime.Now.ToShortTimeString(),
            //            Titulo = "Primer hallazgo prueba",
            //            Administrador = "Deberia ser un Id Administrador",
            //            UltFecha = DateTime.Now,
            //            DiasRta = 1,
            //            Duracion = 1,
            //            Registraciones = new List<Registracion> {
            //            new Registracion {
            //                Id = 1,
            //                Usuario = "Usuario Reg 1 (Id?)",
            //                Fecha = DateTime.Now,
            //                Hora =  DateTime.Now.ToShortTimeString(),
            //                Descripcion = "Descripcion de Registraciones, Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion Descripcion",
            //                //Adjuntos = new Adjunto { FullPath = fullPath, Name = nameFile }
            //            },new Registracion {
            //                Id = 2,
            //                Usuario = "Usuario Reg 2 (Id?)",
            //                Fecha = DateTime.Now,
            //                Hora =   DateTime.Now.ToShortTimeString(),
            //                Descripcion = "Descripcion de Registraciones 2, Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2 Descripcion 2",
            //                //Adjuntos = new List<string>{"C:\\RutaDeAdjunto2"}
            //            }},
            //        });
            //        _context.SaveChanges();
            //    }
            //    _context.SaveChanges();
            //}
            //catch (Exception)
            //{
            //    throw;
            //}
        }

        private DataRow CreateFakeDataTable()
        {
            DataTable usersTable = new DataTable();

            usersTable.Columns.Add("MotivoID");
            usersTable.Columns.Add("MotivoDesc");

            usersTable.Columns.Add("EstadoID");
            usersTable.Columns.Add("EstadoDesc");

            DataRow userRow = usersTable.NewRow();

            userRow["MotivoID"] = 2;
            userRow["MotivoDesc"] = "Motivo 2";

            userRow["EstadoID"] = "4";
            userRow["EstadoDesc"] = "Estado 4";

            return userRow;
        }

        //[HttpGet]
        //[DisableCors]
        //public ActionResult<List<Hallazgo>> Get()
        //{
        //    List<Hallazgo> lstHallazgos = new List<Hallazgo>();
        //    Hallazgo item = _context.HallazgoItems.FirstOrDefault();

        //    lstHallazgos = _context.HallazgoItems.ToList();

        //    DataRow dr = CreateFakeDataTable();
        //    item.Motivo = new Motivo(dr, "MotivoID", "MotivoDesc");
        //    item.Estado = new Estado(dr, "EstadoID", "EstadoDesc");

        //    return lstHallazgos;
        //}

        //[HttpGet]
        //[DisableCors]
        //public ActionResult<List<Hallazgo>> Get()
        //{
        //    List<Hallazgo> lstHallazgos = new List<Hallazgo>();
        //    try
        //    {
        //        PanelC.Conexion objConexion = new PanelC.Conexion();

        //        if (objConexion.Iniciar(Configuration["ConexionCache:CacheServer"], int.Parse(Configuration["ConexionCache:CachePort"]), Configuration["ConexionCache:CacheNameSpace"], Configuration["ConexionCache:CacheShamanAplicacion"], Configuration["ConexionCache:CacheShamanUser"], int.Parse(Configuration["ConexionCache:CacheShamanCentro"]), true))
        //        {
        //            //TrySaveMotivosBitacoras();
        //            EmergencyC.Bitacoras bitacoras = new EmergencyC.Bitacoras();

        //            DataTable dt = bitacoras.GetHallazgos(29);
                    

        //            if (dt == null) return lstHallazgos;

        //            foreach (DataRow r in dt.Rows)
        //            {
        //                Hallazgo hallazgo = new Hallazgo(r);
        //                hallazgo.Registraciones = GetRegistraciones(bitacoras, hallazgo.Id);
        //                lstHallazgos.Add(hallazgo);//Hacer un metodo generico que devuelva lista de objetos y no tablas.
        //            }

        //            objConexion.Cerrar(objConexion.PID);

        //            return lstHallazgos;// Hacer un save new motivo para probar.
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(ex);
        //    }
        //    return null;
        //}

        [HttpGet]
        [DisableCors]
        public ActionResult<List<Hallazgo>> Get()
        {
            List<Hallazgo> lstHallazgos = new List<Hallazgo>();
            try
            {
                PanelC.Conexion objConexion = new PanelC.Conexion();

                if (objConexion.Iniciar(Configuration["ConexionCache:CacheServer"], int.Parse(Configuration["ConexionCache:CachePort"]), Configuration["ConexionCache:CacheNameSpace"], Configuration["ConexionCache:CacheShamanAplicacion"], Configuration["ConexionCache:CacheShamanUser"], int.Parse(Configuration["ConexionCache:CacheShamanCentro"]), true))
                {
                    //TrySaveMotivosBitacoras();
                    EmergencyC.Bitacoras bitacoras = new EmergencyC.Bitacoras();

                    lstHallazgos = bitacoras.GetHallazgos<Hallazgo>(29);


                    if (lstHallazgos.Count == 0) return lstHallazgos;

                    foreach (Hallazgo hallazgo in lstHallazgos)
                    {
                        hallazgo.Registraciones = GetRegistraciones(bitacoras, hallazgo.Id);
                        //lstHallazgos.Add(hallazgo);//Hacer un metodo generico que devuelva lista de objetos y no tablas.
                    }

                    objConexion.Cerrar(objConexion.PID);

                    return lstHallazgos;// Hacer un save new motivo para probar.
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return null;
        }

        private List<Registracion> GetRegistraciones(EmergencyC.Bitacoras bitacoras, long id)
        {
            List<Registracion> lr = new List<Registracion>();
            DataTable dt = new DataTable();
            dt.Columns.Add("ID");
            dt.Columns.Add("UsuarioId");
            dt.Columns.Add("Usuario");
            dt.Columns.Add("regFecha");
            dt.Columns.Add("regHora");
            dt.Columns.Add("Adjunto");
            dt.Columns.Add("Detalle");
            dt.Columns.Add("DireccionEmail");
            dt.Columns.Add("TipoRespuestaBitacoraId");

            bitacoras.GetRegistracionesByBitacora(id, ref dt);
            foreach (DataRow dr in dt.Rows)
            {
                lr.Add(new Registracion(dr));
            }
            return lr;
        }

        private void TrySaveMotivosBitacoras()
        {
            Emergency.MotivosBitacoras mb = new Emergency.MotivosBitacoras();

            //mb.ID = 1;
            mb.ClasificacionId = 2;// modDeclares.motBitacorasClasificaciones.hSoporteTecnico;
            mb.Descripcion = "S - BASE - SOLICITUD DE REPARACIONES (edit)";
            mb.TipoNovedad = "";
            mb.VisualColor = "";
            //mb.flgEdicionDestino = "0";
            //mb.flgTaller = "0";
            //mb.regFecha = "10/11/2018";
            //mb.regUsuario = "JAVIER";

            mb.Salvar(mb);
        }

        [HttpGet("{id}", Name = "GetHallazgo")]
        [DisableCors]
        public ActionResult<Hallazgo> GetHallazgoById(int id)
        {

            var item = _context.HallazgoItems
                //.Include(h => h.Destinos)
                .Include(h => h.Registraciones).ThenInclude(x => x.Adjuntos)
                .AsQueryable().Where(x => x.Id == id).FirstOrDefault();



            //var item = _context.HallazgoItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            //FIX error EF Core in save adjuntos
            if (item.Id == 1)
            {
                item.Registraciones.FirstOrDefault().Adjuntos = new List<Adjunto> { new Adjunto { FullPath = "file:///C:/Paramedic/ExtranetApps-angular/ExtranetApps.Api/wwwroot/Upload/Hallazgos/0/1/2/PARAMEDIC.png", Name = "PARAMEDIC" } };
            }

            //DataRow dr = CreateFakeDataTable();
            //item.Motivo = new Motivo(dr, "MotivoID", "MotivoDesc");
            //item.Estado = new Estado(dr, "EstadoID", "EstadoDesc");



            return item;
        }


        //[HttpPost(Name = "AddNewHallazgo")]
        //[DisableCors]
        //public async Task<long> AddNewHallazgo([FromBody] Hallazgo newHallazgo)
        //{
        //    var lastHallazgos = _context.HallazgoItems.Include(h => h.Registraciones).ToList().Last();
        //    if (lastHallazgos.Registraciones.Count > 0)
        //    {
        //        newHallazgo.Registraciones.ToList().Last().Id = lastHallazgos.Registraciones.ToList().Last().Id + 1;
        //    }

        //    //newHallazgo.
        //    if (newHallazgo.Id == 0)
        //    {

        //        newHallazgo.Id = lastHallazgos.Id + 1;
        //        newHallazgo.Nro = lastHallazgos.Nro + 1;
        //        newHallazgo.Hora = DateTime.Now.ToShortTimeString();
        //        _context.HallazgoItems.Add(newHallazgo);
        //    }
        //    else
        //    {
        //        _context.HallazgoItems.First(a => a.Id == newHallazgo.Id).Registraciones = newHallazgo.Registraciones;
        //        _context.HallazgoItems.Update(_context.HallazgoItems.First(a => a.Id == newHallazgo.Id));
        //    }

        //    _context.SaveChanges();

        //    return newHallazgo.Id;
        //}

        //public void Post([FromBody] dynamic newHallazgo)
        //public void Post([FromBody]  prueba newHallazgo)
        [HttpPost]
        [DisableCors]
        public IActionResult Post([FromBody] Hallazgo newHallazgo)
        {
            try
            {
                var lastHallazgos = _context.HallazgoItems.Include(h => h.Registraciones).ToList().Last();
                if (lastHallazgos.Registraciones.Count > 0)
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
            catch (Exception)
            {
            }

            return new OkObjectResult(newHallazgo);
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