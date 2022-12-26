
using DemoApis.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DemoApis
{
    public class Apd:DbContext
    {
        public Apd(DbContextOptions<Apd>options):base(options)
        {

        }
        public DbSet<Department>departments { get; set; }
        public DbSet<Employee>employees { get; set; }
        public DbSet<Register> registers { get; set; }
    }
}
