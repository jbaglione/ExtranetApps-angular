using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ExrtanetApps.Security.Services;
using ExrtanetApps.Security.Entities;

namespace ExrtanetApps.Security.Controllers
{
    //[Authorize]
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
        public IActionResult Authenticate([FromBody]User userParam)
        {
            UserService userService = new UserService();
            var user = _userService.Authenticate(userParam.Username, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        ////POST security/Users
        //[HttpPost]
        //public void Post([FromBody] User userParam)
        //{
        //}

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
