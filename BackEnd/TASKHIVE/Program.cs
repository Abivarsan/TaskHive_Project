using Microsoft.EntityFrameworkCore;
using Serilog;
using TASKHIVE.Common;
using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Repository;
using TASKHIVE.Service;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true);

// Add services to the container.

#region Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CustomPolicy", x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
}
);
#endregion

#region Configure Database
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
#endregion

#region Configure AutoMapper

builder.Services.AddAutoMapper(typeof(MappingProfile));

#endregion

#region Configure Serilog

builder.Host.UseSerilog((context, config) =>
{
    config.WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day);

    if (context.HostingEnvironment.IsProduction() == false)
    {
        config.WriteTo.Console();
    }

});

#endregion


#region configure repos and services
builder.Services.AddTransient<IRoleRepository, RoleRepository>();
builder.Services.AddTransient<IUsersRepository, UsersRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();  
builder.Services.AddTransient<IUserCategoryRepository, UserCategoryRepository>();
builder.Services.AddTransient<IProjectRepository, ProjectRepository>();
builder.Services.AddTransient<IWorkRepository, WorkRepository>();
builder.Services.AddTransient<ITimeLogRepository, TimeLogRepository>();
builder.Services.AddTransient<IMeetingRepository, MeetingRepository>();
builder.Services.AddTransient<IReportRepository, ReportRepository>();
builder.Services.AddTransient<ILabelRepository, LabelRepository>();
builder.Services.AddTransient<IWorkLabelRepository, WorkLabelRepository>();
builder.Services.AddTransient<IUserWorkRepository, UserWorkRepository>();
builder.Services.AddTransient<IUserMeetingRepository, UserMeetingRepository>();

builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));

builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<IPasswordGenerator, PasswordGenerator>();
builder.Services.AddTransient<IJwtService, JwtService>();
#endregion



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CustomPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
