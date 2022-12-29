using AutoMapper;
using DemoApis.Dto;

namespace DemoApis.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeesDto>().ReverseMap();
        }
    }
}
