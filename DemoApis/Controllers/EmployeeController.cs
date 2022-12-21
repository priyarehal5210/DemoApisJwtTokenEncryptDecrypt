using AutoMapper;
using DemoApis.Dto;
using DemoApis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly Apd con;
        private readonly IMapper _mapper;
        public EmployeeController(Apd conn, IMapper mapper)
        {
            con = conn;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult getemp()
        {
            return Ok(con.employees.Include(d => d.department).ToList());
        }
        [HttpPost]
        public IActionResult addemp([FromBody] EmployeesDto employeesDto)
        {
            if (employeesDto == null) return BadRequest();
            var empdto = _mapper.Map<EmployeesDto, Employee>(employeesDto);
            if (empdto == null) return NotFound();
            else
            {
                con.employees.Add(empdto);
                con.SaveChanges();
                return Ok();
            }
        }
        [HttpPut]
        public IActionResult updateemp([FromBody] EmployeesDto employeesDto)
        {
            if (employeesDto == null) return BadRequest();
            var empdto = _mapper.Map<EmployeesDto, Employee>(employeesDto);
            if (empdto == null) return NotFound();
            else
            {
                con.employees.Update(empdto);
                con.SaveChanges();
                return Ok();
            }
        }
        [HttpDelete("{id:int}")]
        public IActionResult delete(int id)
        {
            var empindb = con.employees.Find(id);
            if (empindb == null) return NotFound();
            else
            {
                con.employees.Remove(empindb);
                con.SaveChanges();
                return Ok();
            }
        }

    }
}
