using ExtranetApps.Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NLog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;


namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicyAllowAny")]
    public class UploadController : Controller
    {
        private IHostingEnvironment _hostingEnvironment;
        private readonly ExtranetAppsContext _context;
        private IConfiguration Configuration { get; }
        private Logger logger = LogManager.GetCurrentClassLogger();
        private string connectionString;

        public UploadController(IHostingEnvironment hostingEnvironment, ExtranetAppsContext context, IConfiguration configuration)
        {
            Configuration = configuration;
            connectionString = "Server = " + Configuration["ConexionCache:CacheServer"] +
                                "; Port = " + Configuration["ConexionCache:CachePort"] +
                                "; Namespace = " + Configuration["ConexionCache:CacheNameSpace"] +
                                "; Password = " + "sys" +
                                "; User ID = " + "_system" + "; ";
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit, EnableCors("MyPolicyAllowAny")]
        public ActionResult UploadFile()
        {
            try
            {
                //TODO: no hace falta hacer un path combinado, usar el directorio virtual designado ("Bitacoras")
                //y guardar archivo con el nombre de idBitacora + "--" + idRegistracion + nro de archivo ==> 266503--1_0.png
                var file = Request.Form.Files[0];

                string folderName = "Uploads";

                string entidad = Request.Form["entidad"].ToString();
                string entidadId =  Request.Form["idFirstEntidad"].ToString() + "--" +
                                    Request.Form["idSecondEntidad"].ToString();

                int nroDeAdjunto = Convert.ToInt32(Request.Form["nroFile"].ToString());

                string newPath = Path.Combine(_hostingEnvironment.WebRootPath, folderName, entidad);

                if (!Directory.Exists(newPath))
                    Directory.CreateDirectory(newPath); //TODO: revisar que hace con dos archivos, necesito _0, _1

                if (file.Length > 0)
                {
                    string extension = Path.GetExtension(file.FileName).ToLower();
                    if (extension == ".jpeg")
                        extension = ".jpg";

                    string newFileName = entidadId + "_" + nroDeAdjunto + extension;
                    string fullPath = Path.Combine(newPath, newFileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    Panel.Adjuntos adj = new Panel.Adjuntos();
                    
                    adj.CleanProperties(adj);
                    adj.Entidad = entidad;
                    adj.EntidadId = entidadId;
                    adj.Nombre = newFileName;
                    adj.TipoAdjunto.SetObjectId(TiposAdjuntosMin.GetTipoAdjuntoId(extension));
                    if (adj.Salvar(adj, true, true, connectionString))
                        return Json("Upload Successful.");

                    #region comentCode
                    //En liquidaciones=>
                    //string path = "~/bitacorasAdjuntos/";
                    //if (!Directory.Exists(Server.MapPath(path) + ArchivoOrden.Substring(0, ArchivoOrden.LastIndexOf('\\'))))
                    //    Directory.CreateDirectory(Server.MapPath(path) + ArchivoOrden.Substring(0, ArchivoOrden.LastIndexOf('\\')));
                    //string fileName = ArchivoOrden.Substring(ArchivoOrden.LastIndexOf('\\') + 1);
                    //file.SaveAs(Path.Combine(Server.MapPath(path) + ArchivoOrden.Substring(0, ArchivoOrden.LastIndexOf('\\')), fileName));
                    //Session["ArchivoOrden"] = ArchivoOrden;
                    //En ctaCorrientes
                    //file.SaveAs(Path.Combine(Server.MapPath("~/App_Data/tempCtaCte/"), $"{Session["usr_id"]}_{id}_PDF_{Path.GetExtension(file.FileName)}"));
                    //return Json(new { }, JsonRequestBehavior.AllowGet);
                    //if (values.Length == 3)
                    //{
                    //    long idBitacora = Convert.ToInt64(values[1]);
                    //    long idRegistracion = Convert.ToInt64(values[2]);
                    //    if (idBitacora > 0 && idRegistracion > 0)
                    //    {
                    //        var reg = _context.BitacoraItems.Include(h => h.Registraciones).AsQueryable()
                    //                    .Where(x => x.Id == idBitacora).FirstOrDefault()
                    //                    .Registraciones.First(x => x.Id == idRegistracion.ToString());//idRegistracion.ToString()
                    //        if (reg.Adjuntos == null)
                    //            reg.Adjuntos = new List<Adjunto>();
                    //        reg.Adjuntos.Add(new Adjunto { FullPath = fullPath, Name = fileName });
                    //        _context.SaveChanges();
                    //    }
                    //}
                    #endregion
                }

                return Json("Upload Error.");
            }
            catch (Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }

        [Route("GetTest")]
        [HttpGet(Name = "GetTest")]
        [DisableCors]
        public ActionResult<List<string>> GetTest()
        {
            return new List<string> { "a", "b" };
        }

    }
}