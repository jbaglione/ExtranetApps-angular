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
using System.Net.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using ExtranetApps.Api.Helpers;
using static modDeclares;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Hosting;

namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicyAllowAny")]
    public class ClientesGestionesController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;
        private IConfiguration Configuration { get; }
        private Logger logger = LogManager.GetCurrentClassLogger();
        private string connectionString;
        private IHostingEnvironment _hostingEnvironment;

        public ClientesGestionesController(IHostingEnvironment hostingEnvironment, ExtranetAppsContext context, IConfiguration configuration)
        {
            //TODO: eliminar DESA
            _hostingEnvironment = hostingEnvironment;
            _context = context;
            Configuration = configuration;
            connectionString = "Server = " + Configuration["ConexionCache:CacheServer"] +
                                "; Port = " + Configuration["ConexionCache:CachePort"] +
                                "; Namespace = " + "DESA" + //Configuration["ConexionCache:CacheNameSpace"] +
                                "; Password = " + "sys" +
                                "; User ID = " + "_system" + "; ";
        }

        static List<TipoGestion> tiposGestion = new List<TipoGestion>
        {
            new TipoGestion{Id="1", Descripcion = "uno"},
            new TipoGestion{Id="2", Descripcion = "dos"},
            new TipoGestion{Id="3", Descripcion = "tres"},
            new TipoGestion{Id="4", Descripcion = "cuatro"},
            new TipoGestion{Id="5", Descripcion = "cinco"},
            new TipoGestion{Id="6", Descripcion = "seis"},
            new TipoGestion{Id="7", Descripcion = "siete"},
        };
        static List<ClientesGestion> clientesGestiones = new List<ClientesGestion>{ new ClientesGestion
                {
                    Id=1,
                    ClienteId = 1,
                    TipoGestion = new TipoGestion { Id = "1", Descripcion = "TipoGestion 1" },
                    Fecha = DateTime.Now.AddDays(-1),
                    FechaRecontacto = DateTime.Now.AddDays(1),
                    Observaciones = "observaciones kjsjjads lsad alsdflasdfll",
                    adjunto = new ClienteAdjunto()
                },
                new ClientesGestion
                {
                    Id=2,
                    ClienteId = 1,
                    TipoGestion = new TipoGestion { Id = "2", Descripcion = "TipoGestion 2" },
                    Fecha = DateTime.Now.AddDays(-1),
                    FechaRecontacto = DateTime.Now.AddDays(1),
                    Observaciones = "observaciones 2 kjsjjads lsad alsdflasdfll",
                    adjunto = new ClienteAdjunto()
                }};

        [HttpGet]
        [Authorize]
        [HttpGet("{clienteId}", Name = "GetGestiones")]
        public ActionResult<List<ClientesGestion>> GetGestiones(int clienteId)
        {
            try
            {

                string usuarioId = Request.Headers["UsuarioId"];
                string pAcc = Request.Headers["Acceso"];

                return clientesGestiones.Where(x => x.ClienteId == clienteId).ToList();

                return null; //modGenerics.GetList<ClientesGestion>(new VentasC.Gestionadores().CacheClassController, "GetClientesV2", false, connectionString, vendedor, pAcc, pVis);
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return null;
        }

        [Authorize]
        [HttpGet("{id}", Name = "GetById")]
        public ActionResult<ClientesGestion> GetById(int id)
        {
            ClientesGestion clientesGestion = new ClientesGestion();
            try
            {

                return clientesGestiones.Where(x => x.Id == id).FirstOrDefault();

                EmergencyC.Bitacoras bitacoras = new EmergencyC.Bitacoras();

                if (bitacoras.Abrir(id.ToString(), connectionString))
                {
                    //clientesGestion.Id = (long)bitacoras.ID;
                    //clientesGestion.Nro = Convert.ToInt32(bitacoras.NumeroId);
                    //clientesGestion.Fecha = DateTime.ParseExact(bitacoras.FecHorIngreso, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                    //clientesGestion.Motivo = new Motivo { Id = bitacoras.MotivoBitacoraId.ID.ToString() };
                    //clientesGestion.Titulo = bitacoras.Titulo;
                    //clientesGestion.Estado = new Estado { Id = bitacoras.Situacion.ToString() };
                    //clientesGestion.Registraciones = GetRegistraciones(bitacoras, bitacora.Id);
                }

                return clientesGestion;
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return null;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] ClientesGestion newClientesGestion)
        {
            try
            {
                //TODO: Eliminar.
                //VentasC.TiposGestiones objTiposGestiones = new VentasC.TiposGestiones();
                //objTiposGestiones.ID = 1;
                //objTiposGestiones.Descripcion = "LLamado telefonico";
                //objTiposGestiones.Salvar(objTiposGestiones, true, true, connectionString);


                string usuarioId = Request.Headers["UsuarioId"];

                VentasC.ClientesGestiones objClientesGestiones = new VentasC.ClientesGestiones();

                if (!objClientesGestiones.Abrir(newClientesGestion.Id.ToString(), connectionString))
                {
                    objClientesGestiones.ClienteId.SetObjectId(newClientesGestion.ClienteId.ToString());
                }

                objClientesGestiones.FecGestion = newClientesGestion.Fecha;
                objClientesGestiones.FecRecontacto = newClientesGestion.FechaRecontacto ?? modFechasCs.NullDateTime;
                objClientesGestiones.rtfObservaciones.Rtf = newClientesGestion.Observaciones;
                objClientesGestiones.TipoGestionId.SetObjectId(newClientesGestion.TipoGestion.Id);
                //TODO: revisar
                //objClientesGestiones.TipoGestionId.ID = Convert.ToDecimal(newClientesGestion.TipoGestion.Id);
                if (objClientesGestiones.Salvar(objClientesGestiones, true, true, connectionString))
                {
                    VentasC.ClientesAdjuntos objClientesAdjuntos = new VentasC.ClientesAdjuntos();

                    if (!objClientesAdjuntos.Abrir(objClientesGestiones.ClienteAdjuntoId.ID.ToString(), connectionString))
                    {
                        objClientesAdjuntos.ClienteId = objClientesGestiones.ClienteId;
                        objClientesAdjuntos.ClienteGestionId.SetObjectId(objClientesGestiones.ID.ToString());

                        objClientesAdjuntos.TipoAdjuntoId.SetObjectId(TiposAdjuntosMin.GetTipoAdjuntoId("pdf"));
                        objClientesAdjuntos.FecVencimiento = modFechasCs.MaxFecha;
                        byte[] sPDFDecoded = Convert.FromBase64String(newClientesGestion.adjunto.Archivo.Replace("data:application/pdf;base64,", ""));
                        objClientesAdjuntos.Archivo = sPDFDecoded;
                        if (objClientesAdjuntos.Salvar(objClientesAdjuntos, true, true, connectionString))
                        {
                            /// Relacionamos la gestion con el adjunto grabado o actualizado
                            objClientesGestiones.ClienteAdjuntoId.SetObjectId(objClientesAdjuntos.ID.ToString());
                            if (objClientesGestiones.Salvar(objClientesGestiones, true, true, connectionString))
                            {
                                string webRootPath = _hostingEnvironment.WebRootPath;
                                
                                System.IO.File.WriteAllBytes(webRootPath + "\\ClienteGestion\\" + objClientesGestiones.ID, sPDFDecoded);
                                //todo ok
                            }
                            //Else error.
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return new OkObjectResult(newClientesGestion);
        }

        public ActionResult<List<ClientesGestion>> GetRecontactos(DateTime from, DateTime to)
        {
            //var predicate = PredicateBuilder.New<ClientesGestion>();

            //predicate = predicate.And(x => x.FechaRecontacto >= from);
            //predicate = predicate.And(x => x.FechaRecontacto <= to);

            //return FindBy(predicate);
            return null;
        }


        //TODO: mover a ClientesGestionListables
        [Authorize]
        [HttpGet("GetTiposGestion")]
        public ActionResult<List<TipoGestion>> GetTiposGestion()
        {
            try
            {
                return tiposGestion;
                string usuarioId = Request.Headers["UsuarioId"];
                List<TipoGestion> lstEstadosGestiones = modGenerics.GetList<TipoGestion>(new VentasC.Gestionadores().CacheClassController, "GetEstadoGestiones", false, connectionString, usuarioId);

                //lstEstadosGestiones.RemoveAll(s => string.IsNullOrEmpty(s.Descripcion));
                //lstEstadosGestiones.Insert(0, new EstadoGestion { Id = "", Descripcion = "Todos" });

                return lstEstadosGestiones;
            }
            catch (Exception ex)
            {
                logger.Error("Fallo la solicitud de lista de EstadosGestiones. " + ex.Message);
            }
            return null;
        }
    }
}
