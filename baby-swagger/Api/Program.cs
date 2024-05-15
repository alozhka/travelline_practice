using Api.Domain.UserModel;
using Api.Infrastructure;
using Api.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder( args );

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

const string allowSpecificOrigins = "_allowSpecificOrigins";
builder.Services.AddCors( options =>
{
    options.AddPolicy( name: allowSpecificOrigins,
        policy =>
        {
            policy
                .WithOrigins( "http://localhost:5006" )
                .WithExposedHeaders( "Access-Control-Allow-Origin", "Date", "Server", "Transfer-Encoding" )
                .AllowAnyMethod()
                .AllowAnyHeader();
        } );
} );

builder.Services.AddDbContext<DataContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();

var app = builder.Build();

app.UseCors( allowSpecificOrigins );

// Configure the HTTP request pipeline.
if ( app.Environment.IsDevelopment() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
