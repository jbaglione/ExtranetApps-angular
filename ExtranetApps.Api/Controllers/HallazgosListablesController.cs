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
        private string connectionString;

        public HallazgosListablesController(ExtranetAppsContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
            connectionString = "Server = " + Configuration["ConexionCache:CacheServer"] +
                    "; Port = " + Configuration["ConexionCache:CachePort"] +
                    "; Namespace = " + Configuration["ConexionCache:CacheNameSpace"] +
                    "; Password = " + "sys" +
                    "; User ID = " + "_system" + "; ";
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
            try
            {
                //GetAll
                string pTip = ((int)ShamanClases.modDeclares.motBitacorasClasificaciones.hTodos).ToString();//TODO: Mejorar.
                return modGenerics.GetList<Motivo>(new EmergencyC.MotivosBitacoras().CacheClassController, "GetAll", false, connectionString, pTip);
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
