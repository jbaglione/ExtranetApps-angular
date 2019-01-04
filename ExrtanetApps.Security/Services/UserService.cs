using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ExrtanetApps.Security.Entities;
using ExrtanetApps.Security.Helpers;

namespace ExrtanetApps.Security.Services
{
    public interface IUserService
    {
        UsuarioSeguridad Authenticate(string identificacion, string password, string micrositio = null);
        UsuarioSeguridad AuthenticateBase64(string userBase64);
        IEnumerable<UsuarioSeguridad> GetAll();
        UsuarioSeguridad GetUserByToken(string token, string micrositio, bool refresh = false);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<UsuarioSeguridad> _users = new List<UsuarioSeguridad>
        { 
            new UsuarioSeguridad { ID = 1, Nombre = "Jonathan Baglione", Identificacion="baglione.jonathan", Password = "ahj026" } 
        };

        private List<UserBase64> _usersBase64 = new List<UserBase64>
        {
            new UserBase64 { Id = 1, Base64 = "eyJJZCI6MSwiRmlyc3ROYW1lIjoiVGVzdCIsIkxhc3ROYW1lIjoiVXNlciIsIlVzZXJuYW1lIjoidGVzdCIsIlBhc3N3b3JkIjoidGVzdCJ9"}
        };

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        //FIX
        public UserService()
        {
        }

        ExtranetC.Usuarios userController = new ExtranetC.Usuarios();

        public UsuarioSeguridad Authenticate(string identificacion, string password, string micrositio = null)
        {
            //var user = _users.SingleOrDefault(x => x.Identificacion == identificacion && x.Password == password);
           

            var aLink = userController.LoginArray<LinkAplicacion>(identificacion, password).FirstOrDefault();//Si es valido, devuelve una lista de aplicaciones y el usuario Id.
            if (aLink == null)
                return null;// return null if user not found
            UsuarioSeguridad user = new UsuarioSeguridad { ID = aLink.UsuarioId, Micrositio = aLink.Jerarquia};
            //aLink.Jerarquia

            if (micrositio != null)
                user.Micrositio = micrositio;// user = userController.GetUsuarioInfo<UsuarioSeguridad>(user.ID, micrositio).FirstOrDefault();

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {

                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.ID.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.Micrositio.ToString())
                }
                ),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }

        public IEnumerable<UsuarioSeguridad> GetAll()
        {

            var handler = new JwtSecurityTokenHandler();
            var tokenS = handler.ReadToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1NDQyMDg4ODcsImV4cCI6MTU0NDIwOTAwNywiaWF0IjoxNTQ0MjA4ODg3fQ.VpVEgqhHwB-ensRZZzaUzw-Dl7siV2wUGl1sitY3bMw") as JwtSecurityToken;
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            //if(tokenS.ValidTo
            // return users without passwords
            return _users.Select(x => {
                x.Password = null;
                return x;
            });
        }

        public UsuarioSeguridad AuthenticateBase64(string userBase64)
        {
            //Get UserIdBybase64
            var userId = _usersBase64.SingleOrDefault(x => x.Base64 == userBase64).Id;

            //Get UserById
            var user = _users.SingleOrDefault(x => x.ID == userId);

            // return null if user not found
            if (user == null)
                return null;
            SetNewToken(user);

            return user;
        }

        private void SetNewToken(UsuarioSeguridad user)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.ID.ToString())
                }),
                //Expires = DateTime.UtcNow.AddDays(2),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;
        }

        public UsuarioSeguridad GetUserByToken(string token, string micrositio, bool refresh = false)
        {
            token = token.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            if (tokenS.ValidTo.AddHours(-3) < DateTime.Now)//revisar zona horaria.
                return null;

            long userId = Convert.ToInt64(tokenS.Payload["unique_name"]);
            if(string.IsNullOrEmpty(micrositio))
                micrositio = tokenS.Payload["nameid"].ToString();

            UsuarioSeguridad user = userController.GetUsuarioInfo<UsuarioSeguridad>(userId, micrositio).FirstOrDefault();
            user.Micrositio = micrositio;
            if (refresh)
                SetNewToken(user);
            else
                user.Token = token;

            return user;

        }

    }
}