using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ExtranetApps.Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using System.Data;
using NLog;

namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallazgosListablesController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;
        public IConfiguration Configuration { get; }
        private Logger logger = LogManager.GetCurrentClassLogger();

        public HallazgosListablesController(ExtranetAppsContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
        }

        //[Route("GetMotivos")]
        //[HttpGet(Name = "GetMotivos")]
        //[DisableCors]
        //public ActionResult<List<Motivo>> GetMotivos()
        //{

        //    List<Motivo> lstMotivos = new List<Motivo>();
        //    try
        //    {
        //        PanelC.Conexion objConexion = new PanelC.Conexion();

        //        if (objConexion.Iniciar(Configuration["ConexionCache:CacheServer"], int.Parse(Configuration["ConexionCache:CachePort"]), Configuration["ConexionCache:CacheNameSpace"], Configuration["ConexionCache:CacheShamanAplicacion"], Configuration["ConexionCache:CacheShamanUser"], int.Parse(Configuration["ConexionCache:CacheShamanCentro"]), true))
        //        {
        //            //TrySaveMotivosBitacoras();

        //            DataTable dt = new EmergencyC.MotivosBitacoras().GetAll();
                    
        //            objConexion.Cerrar(objConexion.PID);

        //            if (dt == null) return lstMotivos;

        //            foreach (DataRow r in dt.Rows)
        //                lstMotivos.Add(new Motivo(r, "ID"));//Hacer un metodo generico que devuelva lista de objetos y no tablas.

        //            return lstMotivos;// Hacer un save new motivo para probar.
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(ex);
        //    }
        //    return null;

        //    //return _context.MotivoItems.ToList();
        //}

        [Route("GetMotivos")]
        [HttpGet(Name = "GetMotivos")]
        [DisableCors]
        public ActionResult<List<Motivo>> GetMotivos()
        {

            List<Motivo> lstMotivos;
            try
            {
                PanelC.Conexion objConexion = new PanelC.Conexion();

                if (objConexion.Iniciar(Configuration["ConexionCache:CacheServer"], int.Parse(Configuration["ConexionCache:CachePort"]), Configuration["ConexionCache:CacheNameSpace"], Configuration["ConexionCache:CacheShamanAplicacion"], Configuration["ConexionCache:CacheShamanUser"], int.Parse(Configuration["ConexionCache:CacheShamanCentro"]), true))
                {
                    lstMotivos = new EmergencyC.MotivosBitacoras().GetAll<Motivo>(ShamanClases.modDeclares.motBitacorasClasificaciones.hTodos, true);

                    objConexion.Cerrar(objConexion.PID);

                    return lstMotivos;
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return null;
        }

        [Route("GetEstados")]
        [HttpGet(Name = "GetEstados")]
        [DisableCors]
        public ActionResult<List<Estado>> GetEstados()
        {
            return new List<Estado> { new Estado("1"), new Estado("2"), new Estado("3") };
        }

    }
}
