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

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly Apd con;
        public WeatherForecastController(ILogger<WeatherForecastController> logger, Apd con)
        {
            _logger = logger;
            this.con = con;
        }

        [HttpGet(Name = "Departments")]
        public IActionResult getdep()
        {
            return Ok(con.departments.ToList());
        }
    }
}