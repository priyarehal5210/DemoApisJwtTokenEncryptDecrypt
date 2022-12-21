using AutoMapper;
using DemoApis.Dto;
using DemoApis.Models;

namespace DemoApis
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeesDto>().ReverseMap();
        }
    }
}
