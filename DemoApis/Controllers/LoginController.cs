//using DemoApis.IRepository;
//using DemoApis.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace DemoApis.Controllers
//{
//    [Route("api/login")]
//    [ApiController]
//    public class LoginController : Controller
//    {
//        private readonly Iuser _iuser;
//        public LoginController(Iuser iuser)
//        {
//            _iuser = iuser;
//        }
    
//        [HttpPost("authenticate")]
//        public IActionResult Authenticate([FromBody] UserVm userVM)
//        {
//            var user = _iuser.Authenticate(userVM.username, userVM.password);
//            if (user == null)
//                return BadRequest("Wrong Username / Password");
//            return Ok(user);
//        }
//    }
//}
