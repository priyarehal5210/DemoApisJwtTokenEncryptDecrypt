using AutoMapper;
using DemoApis.Dto;
using DemoApis.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text;

namespace DemoApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EmployeeController : Controller
    {
        private readonly Apd con;
        private readonly IMapper _mapper;
        private readonly IDataProtector _dataProtector;
        public EmployeeController(Apd conn, IMapper mapper,IDataProtectionProvider dataProtectionProvider,DataProtection dataProtection)
        {
            _dataProtector = dataProtectionProvider.CreateProtector(dataProtection.key);
             con = conn;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult getemp()
        {
            //var employeelist = con.employees.ToList();
            //return Ok();
            var employeelist = con.employees.ToList();
            var output = employeelist.Select(d => new
            {
                id=d.Id,
                name =decryptname(d.Name),
                dep=d.department
            });
            return Ok(output);
        }
        [HttpPost]
        public IActionResult addemp([FromBody] EmployeesDto employeesDto)
        {
            if (employeesDto == null) return BadRequest();
            var empdto = _mapper.Map<EmployeesDto, Employee>(employeesDto);
            empdto.Name = encryptname(empdto.Name);
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
        //methods for encrypt and decrypt
        public static string encryptname(string name)
        {
            byte[] storename = ASCIIEncoding.ASCII.GetBytes(name);
            string encryptname = Convert.ToBase64String(storename);
            return encryptname;
        }
        public static string decryptname(string name)
        {
            byte[] entname = Convert.FromBase64String(name);
            string decryptname = ASCIIEncoding.ASCII.GetString(entname);
            return decryptname;
        }
    }
}
