using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoApis.Models
{
    public class Register
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string password { get; set; }
        public string confirmpassword { get; set; }
        [NotMapped]
        public string token { get; set; }
    }
}
