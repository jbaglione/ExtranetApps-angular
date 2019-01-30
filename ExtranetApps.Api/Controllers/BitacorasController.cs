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

namespace ExtranetApps.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicyAllowAny")]
    public class BitacorasController : ControllerBase
    {
        private readonly ExtranetAppsContext _context;
        private IConfiguration Configuration { get; }
        private Logger logger = LogManager.GetCurrentClassLogger();
        private string connectionString;

        public BitacorasController(ExtranetAppsContext context, IConfiguration configuration)
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
        [Authorize]
        public ActionResult<List<Bitacora>> Get()
        {
            try
            {
                string usuarioId = Request.Headers["UsuarioId"];
                //var user = _userService.GetUserByToken(aut, micrositio, true);
                return modGenerics.GetList<Bitacora>(new EmergencyC.Bitacoras().CacheClassController, "GetBitacoras", false, connectionString, usuarioId);
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return null;
        }

        [Authorize]
        [HttpGet("{id}", Name = "GetBitacora")] //=> api/Bitacoras/1
        public ActionResult<Bitacora> GetBitacoraById(int id)
        {
            Bitacora bitacora = new Bitacora();
            try
            {
                EmergencyC.Bitacoras bitacoras = new EmergencyC.Bitacoras();

                if (bitacoras.Abrir(id.ToString(), connectionString))
                {
                    bitacora.Id = (long)bitacoras.ID;
                    bitacora.Nro = Convert.ToInt32(bitacoras.NumeroId);
                    bitacora.Fecha = DateTime.ParseExact(bitacoras.FecHorIngreso, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                    bitacora.Motivo = new Motivo { Id = bitacoras.MotivoBitacoraId.ID.ToString() };
                    bitacora.Titulo = bitacoras.Titulo;
                    bitacora.Estado = new Estado { Id = bitacoras.Situacion.ToString() };
                    bitacora.Registraciones = GetRegistraciones(bitacoras, bitacora.Id);
                }

                return bitacora;
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
                    //item.Hora = "10:05";// objDetalle.regHora;
                    if (item.Adjunto > 0)
                    {
                        item.Adjuntos = modGenerics.GetList<Adjunto>(new Panel.Adjuntos().CacheClassController, "GetAdjuntosAndPath", false, connectionString, "Bitacoras", idSplit[0] + "--" + idSplit[1]);

                        //TODO: borrar
                        //item.Adjuntos.Select(x => x.Path = "http://192.168.5.95:5566/Uploads/Bitacoras/").ToList();
                        item.Adjuntos.Select(x => x.Path = "https://localhost:5001/Uploads/Bitacoras/").ToList();

                        //item.Adjuntos[0].Path + "\\liquidaciones\\";
                        //item.Adjuntos[0].Name = "29143_9408656.jpg";
                        //item.Adjuntos[0].FullPath = item.Adjuntos[0].Path + item.Adjuntos[0].Name;
                    }

                    item.Id = idSplit[1];
                }
            }
            return lr;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Bitacora newBitacora)
        {
            try
            {
                EmergencyC.Bitacoras objBitacoras = new EmergencyC.Bitacoras();

                string usuarioId = Request.Headers["UsuarioId"];
                //string mensaje;
                //bool vIsEnding = false;
                IList<string> iListReclamosId;

                if (newBitacora.Id == 0)
                {
                    objBitacoras.FecHorIngreso = DateTime.Now.ToString();
                    //TODO: podria buscarlo y setarlo en el get new.
                    newBitacora.Nro = Convert.ToInt64(objBitacoras.GetNewBitacoraId(DateTime.Now, usuarioId));// ShamanSession.UsuarioId.ID);
                                                                                                              //objBitacoras.NroTicket = "";//newBitacora.Nro.ToString(); //newBitacora.EditValue;
                    objBitacoras.FecBitacora = newBitacora.Fecha.ToLocalTime(); // La hora del datepicker angular esta adelantada 3Hs
                    objBitacoras.NumeroId = newBitacora.Nro; // this.txtNroBitacora.Tag; ==>GetNewBitacoraId
                    objBitacoras.MotivoBitacoraId.SetObjectId(newBitacora.Motivo.Id); //getItemData(this.cmbMotivos));
                    objBitacoras.Titulo = newBitacora.Titulo;
                }
                else
                {
                    if (!objBitacoras.Abrir(newBitacora.Id.ToString(), connectionString))
                    {
                        return null;
                    }
                }

                DataTable dtRegistaciones = TablasYListas.ToDataTable(newBitacora.Registraciones);
                objBitacoras.Situacion = Convert.ToInt16(newBitacora.Estado.Id) + 1;
                //if (objBitacoras.Validar(dtRegistaciones, vIsEnding, this.getUsuarioFin(), motBitacorasClasificaciones.hSoporteTecnico))
                //usuario de finalizacion no tenemos, envio true, porque el validar da error si no.
                //var tupleValidar = objBitacoras.Validar(dtRegistaciones, vIsEnding, true, motBitacorasClasificaciones.hSoporteTecnico);
                //if (true)
                //{
                if (objBitacoras.Salvar(objBitacoras, true, true, connectionString))
                {
                    newBitacora.Id = Convert.ToInt64(objBitacoras.ID);
                    newBitacora.Nro = Convert.ToInt64(objBitacoras.NumeroId);
                    newBitacora.Estado.Id = objBitacoras.Situacion.ToString();

                    iListReclamosId = objBitacoras.SetRegistraciones(objBitacoras.ID, dtRegistaciones, usuarioId, connectionString);

                    if (iListReclamosId.Count > 0 && iListReclamosId[0] != "0")
                        newBitacora.Registraciones = GetRegistraciones(objBitacoras, newBitacora.Id);

                    //Set destinos, el modelo
                    if(!modGenerics.GetBoolean(new EmergencyC.Bitacoras().CacheClassController, "SetDestinos", false, connectionString, objBitacoras.ID.ToString()))
                        return null;
                }
                else
                    return null;
                        
                //}
                //else
                //    mensaje = tupleValidar.Item2;
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            return new OkObjectResult(newBitacora);
        }

        //Borrar: referencia a original.
        //private void Actualizar(Bitacora newBitacora)
        //{
        //    try
        //    {
        //        //if (this.memoReclamo.Enabled)
        //        //{
        //        //    this.btnRegAceptar.PerformClick();
        //        //}

        //        EmergencyC.Bitacoras objBitacoras = new EmergencyC.Bitacoras();
        //        string mensaje;
        //        IList<string> iListReclamosId;
        //        bool vIsEnding = false;
        //        if (objBitacoras.ID == 0)
        //        {
        //            objBitacoras.FecHorIngreso = DateTime.Now.ToString();
        //        }

        //        //bHabilitarAttach = Directory.Exists(path);
        //        //if (!bHabilitarAttach)
        //        //{
        //        //    MsgBox("En este momento no es posible agregar archivos adjuntos", MsgBoxStyle.Information, "Adjuntos Soporte Técnico");
        //        //}

        //        objBitacoras.NroTicket = newBitacora.Nro.ToString(); //newBitacora.EditValue;
        //        objBitacoras.FecBitacora = newBitacora.Fecha.ToString(); // this.dtpFecBitacora.DateTime.Date;
        //        objBitacoras.NumeroId = newBitacora.Nro.ToString(); // this.txtNroBitacora.Tag;
        //        objBitacoras.MotivoBitacoraId.SetObjectId(newBitacora.Motivo.Id); //getItemData(this.cmbMotivos));
        //        objBitacoras.Titulo = newBitacora.Titulo;

        //        //if (objBitacoras.Situacion <= 2 && this.cmbEstados.SelectedIndex == 2)
        //        //    vIsEnding = true;
        //        DataTable dtRegistaciones = TablasYListas.ToDataTable(newBitacora.Registraciones);

        //        objBitacoras.Situacion = newBitacora.Estado.Id + 1;
        //        //if (objBitacoras.Validar(dtRegistaciones, vIsEnding, this.getUsuarioFin(), motBitacorasClasificaciones.hSoporteTecnico))
        //        var tupleValidar = objBitacoras.Validar(dtRegistaciones, vIsEnding, false, motBitacorasClasificaciones.hSoporteTecnico);
        //        if (tupleValidar.Item1)
        //        {
        //            if (objBitacoras.Salvar(objBitacoras))
        //            {
        //                iListReclamosId = objBitacoras.SetRegistraciones(objBitacoras.ID, dtRegistaciones);
        //                //if ((arrayManejadorAtach.Count > 0))
        //                //{
        //                //    for (i = 0; (i
        //                //                <= (iListReclamosId.Count - 1)); i++)
        //                //    {
        //                //        string reclamosId;
        //                //        reclamosId = iListReclamosId[i].Replace("|", "-");
        //                //        arrayManejadorAtach(i).GuardarLista("Bitacoras", reclamosId, path);
        //                //    }
        //                //}

        //                //objBitacoras.SetDestinos(objBitacoras.ID, this.dtDestinos);
        //                //if (!vIsEnding)
        //                //{
        //                //    if (haveChanges)
        //                //    {
        //                //        if ((MsgBox("¿Desea enviar el resumen del ticket a los destinatarios?", (MsgBoxStyle.Question
        //                //                        + (MsgBoxStyle.YesNo + MsgBoxStyle.DefaultButton1)), "Tickets") == MsgBoxResult.Yes))
        //                //        {
        //                //            objBitacoras.SetMailing(objBitacoras.ID);
        //                //        }

        //                //    }
        //                //}
        //                //else
        //                //{
        //                //    objBitacoras.SetMailing(objBitacoras.ID);
        //                //}
        //            }
        //        }
        //        else
        //            mensaje = tupleValidar.Item2;
        //    }
        //    catch (Exception ex)
        //    {
        //        //HandleError(this.Name, "Actualizar", ex);
        //    }
        //}

        //public IList<string> SetRegistraciones(long pId, List<Registracion> registraciones)
        //{
        //    SetRegistraciones = null;
        //    try
        //    {
        //        IList<string> listId = new List<string>();
        //        int vIdx = 0;
        //        foreach (var dt in registraciones)
        //        {
        //            vIdx++;
        //            Emergency.BitacorasDetalles objDetalle = new Emergency.BitacorasDetalles();
        //            if (!objDetalle.Abrir(dt.Id))
        //            {
        //                objDetalle.BitacoraId.SetObjectId(pId.ToString());
        //                objDetalle.DetalleId = (vIdx + 1).ToString();
        //                objDetalle.regUsuario.SetObjectId(dt.Usuario);
        //                objDetalle.regFecha = modFechasCs.DtoN(dt.Fecha);
        //                objDetalle.regHora = dt.Hora;
        //                //objDetalle.TipoRespuestaBitacoraId.SetObjectId(dt.Rows[vIdx]["TipoRespuestaBitacoraId"]);
        //                objDetalle.Detalle.Texto = dt.Descripcion;

        //                if (objDetalle.Salvar(objDetalle, true, false))
        //                {
        //                    listId.Add(objDetalle.ID);
        //                    this.SetRegistacionDetalle(objDetalle.ID, dt.Descripcion);
        //                }

        //            }
        //            else
        //            {
        //                //objDetalle.TipoRespuestaBitacoraId.SetObjectId(dt.Rows[vIdx]["TipoRespuestaBitacoraId"]);
        //                if (objDetalle.Salvar(objDetalle, true, false))
        //                {

        //                }

        //            }

        //        }

        //        return listId;
        //    }
        //    catch (Exception ex)
        //    {
        //        HandleError(this.CacheClassController, "SetRegistraciones", ex);
        //    }

        //}

        //public bool SetRegistacionDetalle(string pId, string pTxt)
        //{
        //    SetRegistacionDetalle = false;
        //    try
        //    {
        //        CacheMethodSignature mtdSignature = makeCacheMethodSignature(cnnsCache(this.cnnStatic), typeof(CacheStringReturnValue), pId, noUpper(pTxt));
        //        Debug.Print(getCacheDebug(this.CacheClassController, "SetRegistacionDetalle", mtdSignature));
        //        CacheObject.RunClassMethodS(cnnsCache(this.cnnStatic), this.CacheClassController, "SetRegistacionDetalle", mtdSignature);
        //        if (!(((CacheStringReturnValue)(mtdSignature.ReturnValue)).Value == null))
        //        {
        //            SetRegistacionDetalle = true;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        HandleError(this.CacheClassController, "SetRegistacionDetalle", ex);
        //    }
        //}

        //[HttpPost]
        //[EnableCors("MyPolicyAllowAny")]
        //public IActionResult Post([FromBody] string hola)
        //{
        //    return new OkObjectResult(hola);
        //}

        //[HttpPost]
        //[EnableCors("MyPolicyAllowAny")]
        //public IActionResult Post([FromBody] Bitacora newBitacora)
        //{
        //    try
        //    {
        //        var lastBitacoras = _context.BitacoraItems.Include(h => h.Registraciones).ToList().Last();
        //        if (lastBitacoras.Registraciones.Count > 0)
        //        {
        //            newBitacora.Registraciones.ToList().Last().Id = lastBitacoras.Registraciones.ToList().Last().Id + 1;
        //        }
        //        //newBitacora.
        //        if (newBitacora.Id == 0)
        //        {
        //            newBitacora.Id = lastBitacoras.Id + 1;
        //            newBitacora.Nro = lastBitacoras.Nro + 1;
        //            newBitacora.Hora = DateTime.Now.ToShortTimeString();
        //            _context.BitacoraItems.Add(newBitacora);
        //        }
        //        else
        //        {
        //            _context.BitacoraItems.First(a => a.Id == newBitacora.Id).Registraciones = newBitacora.Registraciones;
        //            _context.BitacoraItems.Update(_context.BitacoraItems.First(a => a.Id == newBitacora.Id));
        //        }
        //        _context.SaveChanges();
        //    }
        //    catch (Exception)
        //    {
        //    }
        //    return new OkObjectResult(newBitacora);
        //}

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

        //[HttpGet("{id}", Name = "GetBitacora")]
        //[DisableCors]
        //public ActionResult<Bitacora> GetBitacoraById(int id)
        //{
        //    var item = _context.BitacoraItems
        //        //.Include(h => h.Destinos)
        //        .Include(h => h.Registraciones).ThenInclude(x => x.Adjuntos)
        //        .AsQueryable().Where(x => x.Id == id).FirstOrDefault();
        //    //var item = _context.BitacoraItems.Find(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    //FIX error EF Core in save adjuntos
        //    if (item.Id == 1)
        //    {
        //        item.Registraciones.FirstOrDefault().Adjuntos = new List<Adjunto> { new Adjunto { FullPath = "file:///C:/Paramedic/ExtranetApps-angular/ExtranetApps.Api/wwwroot/Upload/Bitacoras/0/1/2/PARAMEDIC.png", Name = "PARAMEDIC" } };
        //    }
        //    //DataRow dr = CreateFakeDataTable();
        //    //item.Motivo = new Motivo(dr, "MotivoID", "MotivoDesc");
        //    //item.Estado = new Estado(dr, "EstadoID", "EstadoDesc");
        //    return item;
        //}
        //[HttpGet]
        ////[AllowAnonymous]
        //[Authorize]
        //public async System.Threading.Tasks.Task<ActionResult<List<Bitacora>>> Get()
        //{
        //    try
        //    {
        //        //Request.Headers["Authorization"];
        //        ////Request. //Solo validames en el get principal del micrositio
        //        //string token = Request.Headers["Authorization"];
        //        //bool val = await ValidateToken(token.ToString());
        //        //if (!val)
        //        //    return BadRequest(new { message = "Username or password is incorrect" });
        //        //return Forbid();
        //        //ValidateUserAsync(Request.Headers["UserBase64"]);//GET-TOKEN

        //        //TODO: pasar a metodo interno en Bitacoras.
        //        return modGenerics.GetList<Bitacora>(new EmergencyC.Bitacoras().CacheClassController, "GetBitacoras", false, connectionString, "29");
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.Error(ex);
        //    }
        //    return null;
        //}

        //private async System.Threading.Tasks.Task<bool> ValidateToken(string token)
        //{
        //    try
        //    {
        //        using (var httpClient = new HttpClient())
        //        {
        //            httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
        //            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        //            //var a = httpClient.PostAsync(new Uri(Configuration["URLSecurity"] + "authenticateBase64"), new StringContent("application/json"));
        //            var result = await httpClient.PostAsync(new Uri(Configuration["URLSecurity"] + "GetAll"), new StringContent("application/json"));
        //            var user = JsonConvert.DeserializeObject<User>(await result.Content.ReadAsStringAsync());
        //            return user != null;
        //            //var response = httpClient.PostAsJsonAsync(new Uri(Configuration["URLSecurity"] + "authenticateBase64"), new StringContent("application/json")).Result;

        //            //OkObjectResult r = httpClient.PostAsJsonAsync(new Uri(Configuration["URLSecurity"] + "authenticateBase64"), new StringContent("application/json")).Result;
        //        }
        //    }

        //    catch (Exception ex)
        //    {
        //    }
        //    return false;
        //}

        //[HttpGet("{id}", Name = "GetBitacora")] //=> api/Bitacoras/1
        //[EnableCors("MyPolicyAllowAny")]
        //public ActionResult<Bitacora> GetBitacoraById(int id)
        //[HttpGet("{token}", Name = "Get")]

        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult GetAll()
        //{
        //    string aut = Request.Headers["Authorization"];

        //    //var users = _userService.GetAll();
        //    //return Ok();
        //    return Redirect("http://localhost:4200/bitacoras");
        //}

        //private async System.Threading.Tasks.Task<bool> ValidateUserAsync(string base64)
        //{
        //    using (var httpClient = new HttpClient())
        //    {
        //        httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
        //        httpClient.DefaultRequestHeaders.Add("UserBase64", base64);

        //        //var a = httpClient.PostAsync(new Uri(Configuration["URLSecurity"] + "authenticateBase64"), new StringContent("application/json"));
        //        var result = await httpClient.PostAsync(new Uri(Configuration["URLSecurity"] + "authenticateBase64"), new StringContent("application/json"));
        //        var user = JsonConvert.DeserializeObject<User>(await result.Content.ReadAsStringAsync());

        //        var response = httpClient.PostAsJsonAsync(new Uri(Configuration["URLSecurity"] + "authenticateBase64"), new StringContent("application/json")).Result;

        //        //OkObjectResult r = httpClient.PostAsJsonAsync(new Uri(Configuration["URLSecurity"] + "authenticateBase64"), new StringContent("application/json")).Result;
        //    }
        //    return true;
        //}
    }

    //public class User
    //{
    //    public int Id { get; set; }
    //    public string FirstName { get; set; }
    //    public string LastName { get; set; }
    //    public string Username { get; set; }
    //    public string Password { get; set; }
    //    public string Token { get; set; }
    //}
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