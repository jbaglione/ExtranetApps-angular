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
        User Authenticate(string username, string password);
        User AuthenticateBase64(string userBase64);
        IEnumerable<User> GetAll();
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        { 
            new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" } 
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

        public User Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

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

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                //Expires = DateTime.UtcNow.AddDays(7),
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }
    }
}