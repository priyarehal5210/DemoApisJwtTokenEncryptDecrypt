using DemoApis.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace DemoApis.Dto
{
    public class EmployeesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Display(Name = "Department")]
        public int DepartmentId { get; set; }
        public bool IsOkay { get; set; }

    }
}
