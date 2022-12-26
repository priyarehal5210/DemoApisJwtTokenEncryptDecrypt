using DemoApis.Migrations;
using DemoApis.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DemoApis.Controllers
{
    [Route("api/register")]
    [ApiController]
    public class RegisterController : Controller
    {
        private readonly Apd _con;
        IDataProtector _dataProtector;
        public RegisterController(Apd con,IDataProtectionProvider protector)
        {
            _dataProtector = protector.CreateProtector(GetType().FullName);
            _con = con;
        }
        [HttpGet]
        public IActionResult getusers()
        {

            return Ok(_con.registers.ToList());
        }
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

                _con.registers.Add(register);
                _con.SaveChanges();
                return Ok(new { message = "registered succesfully!!" });

            }
            return BadRequest(new { message = "password should match each other." });
        }
    }
}
