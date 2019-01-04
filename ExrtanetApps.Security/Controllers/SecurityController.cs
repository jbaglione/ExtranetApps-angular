using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ExrtanetApps.Security.Services;
using ExrtanetApps.Security.Entities;
using System.Linq;

namespace ExrtanetApps.Security.Controllers
{
    [Authorize]
    [Route("security/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // POST security/Users/authenticate
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UsuarioSeguridad userParam)
        {
            UserService userService = new UserService();
            var user = _userService.Authenticate(userParam.Identificacion, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("authenticateByUserPass")]
        public IActionResult AuthenticateByUserPass()
        {
            var req = Request;
            var headers = req.Headers;
            string micrositio = headers["Jerarquia"];

            UserService userService = new UserService();
            
            var user = _userService.Authenticate(headers["Identificacion"], headers["Password"], micrositio);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("authenticateBase64")]
        public IActionResult AuthenticateBase64()
        {
            var req = Request;
            var headers = req.Headers;
            var values = headers["UserBase64"];

            UserService userService = new UserService();
            var user = _userService.AuthenticateBase64(values.ToString());

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }


        [AllowAnonymous]
        [HttpPost("authenticateByToken")]
        public IActionResult AuthenticateByToken([FromBody]UsuarioSeguridad userParam)
        {
            //var req = Request;
            //var headers = req.Headers;
            //var token = headers["Token"];
            //var micrositio = headers["Micrositio"];

            UserService userService = new UserService();
            var user = _userService.GetUserByToken(userParam.Token, userParam.Micrositio);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
        

        //[AllowAnonymous]
        //[HttpPost("authenticateBase64")]
        //public ActionResult<User> AuthenticateBase64()
        //{
        //    var req = Request;
        //    var headers = req.Headers;
        //    var values = headers["UserBase64"];

        //    UserService userService = new UserService();
        //    var user = _userService.AuthenticateBase64(values.ToString());

        //    if (user == null)
        //        return BadRequest(new { message = "Username or password is incorrect" });

        //    return user;
        //}

        ////POST security/Users
        //[HttpPost]
        //public void Post([FromBody] User userParam)
        //{
        //}

        [HttpGet]
        public IActionResult GetAll()
        {
            string aut = Request.Headers["Authorization"];
            string micrositio = Request.Headers["Micrositio"];
            var user = _userService.GetUserByToken(aut, micrositio);
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("refreshToken")]
        public IActionResult RefreshToken()
        {
            string aut = Request.Headers["Authorization"];
            string micrositio = Request.Headers["Micrositio"];
            var user = _userService.GetUserByToken(aut, micrositio, true);
            //var users = _userService.GetAll();
            return Ok(user);
        }
    }
}
