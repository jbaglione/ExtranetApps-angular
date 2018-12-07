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
                //TODO: no hace falta hacer un path combinado, usar el directorio virtual designado ("Hallazgos")
                //y guardar archivo con el nombre de idHallazgo + "--" + idRegistracion + nro de archivo ==> 266503--1_0.png
                var file = Request.Form.Files[0];
                string folderName = "Hallazgos";
                
                //Queda asi, porque permitiria manejar mejor el directorio de almacenamiento a futuro.
                string[] values = file.Name.Split('-');
                string idHallazgo = values[1];
                string idRegistracion = values[2];
                int totalDeAdjunto = Convert.ToInt32(values[3]);
                int nroDeAdjunto = Convert.ToInt32(values[4]) + totalDeAdjunto;
                
                //string subFolders = file.Name.Replace('-', '\\');
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);//, subFolders);
                if (!Directory.Exists(newPath))
                    Directory.CreateDirectory(newPath); //TODO: revisar que hace con dos archivos, necesito _0, _1

                if (file.Length > 0)
                {
                    string entidadId = idHallazgo + "--" + idRegistracion;
                    //int nroDeAdjunto = modGenerics.GetList<Adjunto>(new Panel.Adjuntos().CacheClassController, "GetAdjuntosAndPath", false, connectionString, "Bitacoras", entidadId).Count;
                    
                    //string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string extension = Path.GetExtension(file.FileName);
                    string newFileName = entidadId + "_" + nroDeAdjunto + extension;
                    string fullPath = Path.Combine(newPath, newFileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    Panel.Adjuntos adj = new Panel.Adjuntos();
                    List<TiposAdjuntosMin> TipoAdjuntos = modGenerics.GetList<TiposAdjuntosMin>(new Panel.TiposAdjuntos().CacheClassController, "GetTipoAdjuntos", false, connectionString);
                    
                    adj.CleanProperties(adj);
                    adj.Entidad = "Bitacoras";
                    adj.EntidadId = idHallazgo + "--" + idRegistracion;
                    adj.Nombre = newFileName;
                    adj.TipoAdjunto.SetObjectId(TipoAdjuntos.Where(x => x.Extension == extension.Remove(0,1)).FirstOrDefault().ID.ToString());
                    if(adj.Salvar(adj))
                        return Json("Upload Successful.");

                    #region comentCode
                    //En liquidaciones=>
                    //string path = "~/hallazgosAdjuntos/";
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
                    //    long idHallazgo = Convert.ToInt64(values[1]);
                    //    long idRegistracion = Convert.ToInt64(values[2]);
                    //    if (idHallazgo > 0 && idRegistracion > 0)
                    //    {
                    //        var reg = _context.HallazgoItems.Include(h => h.Registraciones).AsQueryable()
                    //                    .Where(x => x.Id == idHallazgo).FirstOrDefault()
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

    public class TiposAdjuntosMin
    {
        public decimal ID { get; set; }
        public string Extension{ get; set; }

    }
}