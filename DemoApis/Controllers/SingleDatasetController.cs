using DemoApis.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SingleDatasetController : Controller
    {
        private readonly Apd _con;
        public SingleDatasetController(Apd con)
        {
            _con = con;
        }
        [HttpGet]
        public IActionResult getall()
        {
            return Ok(_con.singleDatasetTabels.ToList());
        }
        [HttpPost]
        public IActionResult addUser([FromBody] SingleDatasetTabel singleDatasetTabel)
        {
            if(ModelState.IsValid && singleDatasetTabel.id == 0)
            {
                singleDatasetTabel.checkme = false;
                _con.singleDatasetTabels.Add(singleDatasetTabel);
                _con.SaveChanges();
                return Ok(singleDatasetTabel);
            }
            return BadRequest();
        }
        [HttpPut]
        public IActionResult updateUser([FromBody] SingleDatasetTabel singleDatasetTabel)
        {
            if (ModelState.IsValid && singleDatasetTabel.id != 0)
            {
                _con.singleDatasetTabels.Update(singleDatasetTabel);
                _con.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("{id:int}")]
        public IActionResult deleteuser(int id)
        {
            var userfromdb = _con.singleDatasetTabels.Find(id);
            if (userfromdb == null) return NotFound();
            else
            {
                _con.singleDatasetTabels.Remove(userfromdb);
                _con.SaveChanges();
                return Ok();
            }
        }
    }
}
