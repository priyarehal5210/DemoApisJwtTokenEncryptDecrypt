using DemoApis.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {
        private readonly Apd _con;
        public TestController(Apd con) { _con = con; }
        [HttpGet]
        public IActionResult getall()
        {
            return Ok(_con.tests.ToList());
        }
        [HttpPost]
        public IActionResult addtest([FromBody] Test test)
        {
            test.id = 0;

            if(ModelState.IsValid && test.id == 0)
            {
                _con.tests.Add(test);
                _con.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

    }
}
