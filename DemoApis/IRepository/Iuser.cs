using DemoApis.Models;

namespace DemoApis.IRepository
{
    public interface Iuser
    {
        //bool IsUniqueUser(string Username);
        Register Authenticate(string Username, string password);
        //Register Register(string Username, string Password);

    }
}
