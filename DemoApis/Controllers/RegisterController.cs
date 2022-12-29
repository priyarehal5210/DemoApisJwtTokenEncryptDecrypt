using DemoApis.IRepository;
using DemoApis.Migrations;
using DemoApis.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text;

namespace DemoApis.Controllers
{
    [Route("api/register")]
    [ApiController]
    public class RegisterController : Controller
    {
        private readonly Apd _con;
        private readonly Iuser _iuser;
        public RegisterController(Apd con, Iuser iuser)
        {
            _iuser = iuser;
            _con = con;
        }

        [HttpGet]
        public IActionResult getusers()
        {
            var allusers = _con.registers.ToList();
            var output = allusers.Select(
                e => new
                {
                    e.Id,
                    e.Name,
                    password=decryptpassword(e.password),
                    e.confirmpassword
                }); 
            return Ok(output);
        }
        //register method
        [HttpPost]
        public IActionResult adduser([FromBody] Register register)
        {
            var user = _con.registers.FirstOrDefault(u => u.Name == register.Name);
            if (user != null)
            {
                return BadRequest(new { message = "user already exsited!!" });
            }
            if (register.password == register.confirmpassword)
            {
                register.password = encryptpassword(register.password);
                _con.registers.Add(register);
                _con.SaveChanges();
                return Ok(new { message = "registered succesfully!!" });
            }
            return BadRequest(new { message = "password should match each other." });
        }

        //login method
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserVm userVM)
        {
            var user = _iuser.Authenticate(userVM.username , userVM.password);
            if (user == null)
                return BadRequest("Wrong Username / Password");
            return Ok(user);
        }
        //methods for encrypt and decrypt
        public static string encryptpassword(string password)
        {
            byte[] storename = ASCIIEncoding.ASCII.GetBytes(password);
            string encryptname = Convert.ToBase64String(storename);
            return encryptname;
        }
        public static string decryptpassword(string password)
        {
            byte[] entname = Convert.FromBase64String(password);
            string decryptname = ASCIIEncoding.ASCII.GetString(entname);
            return decryptname;
        }
    }
}
