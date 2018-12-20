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
        User Authenticate(string identificacion, string password);
        User AuthenticateBase64(string userBase64);
        IEnumerable<User> GetAll();
        User GetUserByToken(string token, bool refresh = false);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        { 
            new User { Id = 1, Nombre = "Jonathan Baglione", Identificacion="baglione.jonathan", Password = "ahj026" } 
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

        public User Authenticate(string identificacion, string password)
        {
            var user = _users.SingleOrDefault(x => x.Identificacion == identificacion && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }

        public IEnumerable<User> GetAll()
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

        public User AuthenticateBase64(string userBase64)
        {
            //Get UserIdBybase64
            var userId = _usersBase64.SingleOrDefault(x => x.Base64 == userBase64).Id;

            //Get UserById
            var user = _users.SingleOrDefault(x => x.Id == userId);

            // return null if user not found
            if (user == null)
                return null;
            SetNewToken(user);

            return user;
        }

        private void SetNewToken(User user)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
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

        public User GetUserByToken(string token, bool refresh = false)
        {
            token = token.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            if (tokenS.ValidTo.AddHours(-3) < DateTime.Now)//revisar zona horaria.
                return null;

            long userId = Convert.ToInt64(tokenS.Payload["unique_name"]);

            var user = _users.Where(x => x.Id == userId).FirstOrDefault();

            if(refresh)
                SetNewToken(user);
            else
                user.Token = token;

            return user;

        }

    }
}