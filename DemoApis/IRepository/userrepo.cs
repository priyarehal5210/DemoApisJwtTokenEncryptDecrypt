using DemoApis.Migrations;
using DemoApis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DemoApis.IRepository
{
    public class userrepo : Iuser
    {
        private readonly Apd _con;
        private readonly appsettings _appsettings;
        public userrepo(Apd conn,IOptions<appsettings> appsettings)
        {
            _con = conn;
            _appsettings = appsettings.Value;
        }
        public Register Authenticate(string Username, string password)
        {
            var userexist = _con.registers.FirstOrDefault(u => u.Name == Username);
            if (userexist != null) {
                var userindb =decryptpassword(userexist.password);
                userexist.password = userindb;
            }
            if(userexist.Name==Username && userexist.password == password)
            {
                //JWT Autentication
                var TokenHandeler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appsettings.secret);
                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name,userexist.Id.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key)
                   , SecurityAlgorithms.HmacSha256Signature)

                };
                var token = TokenHandeler.CreateToken(tokenDescriptor);
                userexist.token = TokenHandeler.WriteToken(token);
                return userexist;
            }
            return null;
        }
        public static string decryptpassword(string password)
        {
            byte[] entname = Convert.FromBase64String(password);
            string decryptname = ASCIIEncoding.ASCII.GetString(entname);
            return decryptname;
        }
    }
}
