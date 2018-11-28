using ExtranetApps.Api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;


namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : Controller
    {
        private IHostingEnvironment _hostingEnvironment;
        private readonly ExtranetAppsContext _context;

        public UploadController(IHostingEnvironment hostingEnvironment, ExtranetAppsContext context)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit, DisableCors]
        public ActionResult UploadFile()
        {
            try
            {
                //TODO: no hace falta hacer un path combinado, usar el directorio virtual designado ("Hallazgos")
                //y guardar archivo con el nombre de idHallazgo + "--" + idRegistracion + nro de archivo ==> 266503--1_0.png
                var file = Request.Form.Files[0];
                string folderName = "Upload\\Hallazgos";
                string[] values = file.Name.Split('-');
                string subFolders = file.Name.Replace('-', '\\');
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName, subFolders);//subFolders
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

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
                }



                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
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