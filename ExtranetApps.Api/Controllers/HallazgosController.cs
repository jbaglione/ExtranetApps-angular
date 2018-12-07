using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ExtranetApps.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using NLog;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Globalization;

namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicyAllowAny")]
    public class HallazgosController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;
        private IConfiguration Configuration { get; }
        private Logger logger = LogManager.GetCurrentClassLogger();
        private string connectionString;

        public HallazgosController(ExtranetAppsContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
            connectionString =  "Server = " + Configuration["ConexionCache:CacheServer"] +
                                "; Port = " + Configuration["ConexionCache:CachePort"] +
                                "; Namespace = " + Configuration["ConexionCache:CacheNameSpace"] +
                                "; Password = " + "sys" +
                                "; User ID = " + "_system" + "; ";
        }

        [HttpGet]
        [EnableCors("MyPolicyAllowAny")]
        public ActionResult<List<Hallazgo>> Get()
        {
            try
            {
                //TODO: pasar a metodo interno en Bitacoras.
                return modGenerics.GetList<Hallazgo>(new EmergencyC.Bitacoras().CacheClassController, "GetHallazgos", false, connectionString, "29");
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return null;
        }

        private List<Registracion> GetRegistraciones(EmergencyC.Bitacoras bitacoras, long id)
        {
            List<Registracion> lr = modGenerics.GetList<Registracion>(bitacoras.CacheClassController, "GetRegistracionesByBitacora", false, connectionString, id.ToString());
            
            foreach (Registracion item in lr)
            {
                Emergency.BitacorasDetalles objDetalle = new Emergency.BitacorasDetalles();
                if (objDetalle.Abrir(item.Id.ToString(), connectionString))
                {
                    var idSplit = item.Id.Split("||");
                    
                    item.Descripcion = objDetalle.Detalle.Texto;
                    item.Hora = "10:05";// objDetalle.regHora;
                    if(item.Adjunto > 0)
                    {
                        item.Adjuntos = modGenerics.GetList<Adjunto>(new Panel.Adjuntos().CacheClassController, "GetAdjuntosAndPath", false, connectionString, "Bitacoras", idSplit[0] + "--" + idSplit[1]);
                        //item.Adjuntos[0].Path = item.Adjuntos[0].Path + "\\liquidaciones\\";
                        //item.Adjuntos[0].Name = "29143_9408656.jpg";
                        //item.Adjuntos[0].FullPath = item.Adjuntos[0].Path + item.Adjuntos[0].Name;
                    }
                       
                    item.Id = idSplit[1];
                }
            }
            return lr;
        }

        [HttpGet("{id}", Name = "GetHallazgo")] //=> api/Hallazgos/1
        [EnableCors("MyPolicyAllowAny")]
        public ActionResult<Hallazgo> GetHallazgoById(int id)
        {

            Hallazgo hallazgo = new Hallazgo();
            try
            {
                EmergencyC.Bitacoras bitacoras = new EmergencyC.Bitacoras();

                if (bitacoras.Abrir(id.ToString(), connectionString))
                {
                    hallazgo.Id = (long)bitacoras.ID;
                    hallazgo.Nro = Convert.ToInt32(bitacoras.NumeroId);
                    hallazgo.Fecha = DateTime.ParseExact(bitacoras.FecHorIngreso, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                    hallazgo.Motivo = new Motivo { Id = bitacoras.MotivoBitacoraId.ID.ToString() };
                    hallazgo.Titulo = bitacoras.Titulo;
                    hallazgo.Estado = new Estado { Id = bitacoras.Situacion };
                    hallazgo.Registraciones = GetRegistraciones(bitacoras, hallazgo.Id);
                }

                return hallazgo;
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return null;
        }

        //[HttpPost]
        //[EnableCors("MyPolicyAllowAny")]
        //public IActionResult Post([FromBody] string hola)
        //{
        //    return new OkObjectResult(hola);
        //}

        //[HttpPost]
        //[EnableCors("MyPolicyAllowAny")]
        //public IActionResult Post([FromBody] Hallazgo newHallazgo)
        //{
        //    try
        //    {
        //        var lastHallazgos = _context.HallazgoItems.Include(h => h.Registraciones).ToList().Last();
        //        if (lastHallazgos.Registraciones.Count > 0)
        //        {
        //            newHallazgo.Registraciones.ToList().Last().Id = lastHallazgos.Registraciones.ToList().Last().Id + 1;
        //        }
        //        //newHallazgo.
        //        if (newHallazgo.Id == 0)
        //        {
        //            newHallazgo.Id = lastHallazgos.Id + 1;
        //            newHallazgo.Nro = lastHallazgos.Nro + 1;
        //            newHallazgo.Hora = DateTime.Now.ToShortTimeString();
        //            _context.HallazgoItems.Add(newHallazgo);
        //        }
        //        else
        //        {
        //            _context.HallazgoItems.First(a => a.Id == newHallazgo.Id).Registraciones = newHallazgo.Registraciones;
        //            _context.HallazgoItems.Update(_context.HallazgoItems.First(a => a.Id == newHallazgo.Id));
        //        }
        //        _context.SaveChanges();
        //    }
        //    catch (Exception)
        //    {
        //    }
        //    return new OkObjectResult(newHallazgo);
        //}



        /*Borrar ->*/
        //private void TrySaveMotivosBitacoras()
        //{
        //    Emergency.MotivosBitacoras mb = new Emergency.MotivosBitacoras();
        //    //mb.ID = 1;
        //    mb.ClasificacionId = 2;// modDeclares.motBitacorasClasificaciones.hSoporteTecnico;
        //    mb.Descripcion = "S - BASE - SOLICITUD DE REPARACIONES (edit)";
        //    mb.TipoNovedad = "";
        //    mb.VisualColor = "";
        //    //mb.flgEdicionDestino = "0";
        //    //mb.flgTaller = "0";
        //    //mb.regFecha = "10/11/2018";
        //    //mb.regUsuario = "JAVIER";
        //    mb.Salvar(mb);
        //}

        //[HttpGet("{id}", Name = "GetHallazgo")]
        //[DisableCors]
        //public ActionResult<Hallazgo> GetHallazgoById(int id)
        //{
        //    var item = _context.HallazgoItems
        //        //.Include(h => h.Destinos)
        //        .Include(h => h.Registraciones).ThenInclude(x => x.Adjuntos)
        //        .AsQueryable().Where(x => x.Id == id).FirstOrDefault();
        //    //var item = _context.HallazgoItems.Find(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    //FIX error EF Core in save adjuntos
        //    if (item.Id == 1)
        //    {
        //        item.Registraciones.FirstOrDefault().Adjuntos = new List<Adjunto> { new Adjunto { FullPath = "file:///C:/Paramedic/ExtranetApps-angular/ExtranetApps.Api/wwwroot/Upload/Hallazgos/0/1/2/PARAMEDIC.png", Name = "PARAMEDIC" } };
        //    }
        //    //DataRow dr = CreateFakeDataTable();
        //    //item.Motivo = new Motivo(dr, "MotivoID", "MotivoDesc");
        //    //item.Estado = new Estado(dr, "EstadoID", "EstadoDesc");
        //    return item;
        //}
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