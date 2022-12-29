using DemoApis;
using DemoApis.IRepository;
using DemoApis.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string cs = builder.Configuration.GetConnectionString("conStr");
builder.Services.AddDbContext<Apd>(options => options.UseSqlServer(cs));
builder.Services.AddScoped<Iuser, userrepo>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>c.EnableAnnotations());
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
   builder =>
   {
       builder.WithOrigins("http://localhost:4200")
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod();
   });


});
builder.Services.AddSingleton<DataProtection>();

builder.Services.AddAutoMapper(typeof(MappingProfile));
//JWT implementation
var appsettingssection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<appsettings>(appsettingssection);
var appsetting = appsettingssection.Get<appsettings>();
var key = Encoding.ASCII.GetBytes(appsetting.secret);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("MyPolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
