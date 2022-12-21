using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace DemoApis.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Display(Name = "Department")]
        public int DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department department { get; set; }
        public bool IsOkay { get; set; }
    }
}
