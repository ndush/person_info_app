using Microsoft.EntityFrameworkCore;
using PersonApi.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


builder.Services.AddDbContext<PersonContext>(options =>
    options.UseSqlite("Data Source=persons.db"));
    
builder.Services.AddControllers();

var app = builder.Build();


app.UseCors("AllowAllOrigins"); 

app.UseAuthorization();

app.MapControllers();

app.Run();