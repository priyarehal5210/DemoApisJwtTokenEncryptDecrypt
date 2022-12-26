using System.ComponentModel.DataAnnotations.Schema;

namespace DemoApis.Models
{
    public class Register
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string password { get; set; }
        public string confirmpassword { get; set; }
        public string role { get; set; }
        [NotMapped]
        public string token { get; set; }
    }
}
