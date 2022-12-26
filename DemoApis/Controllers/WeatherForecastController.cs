using DemoApis.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;

namespace DemoApis.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        IDataProtector _protector;
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly Apd con;
        public WeatherForecastController(ILogger<WeatherForecastController> logger, Apd con,IDataProtectionProvider Provider)
        {
            _protector = Provider.CreateProtector(GetType().FullName);
            _logger = logger;
            this.con = con;
        }

        [HttpGet( "Departments")]
        public IActionResult getdep()
        {
            return Ok(con.departments.ToList());
        }
        [HttpGet("test")]
        public IActionResult test()
        {
            var t1 = _protector.Protect("priya");
            return Ok(t1);
        }
       
    }
}