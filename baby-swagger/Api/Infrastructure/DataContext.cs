using Api.Domain.UserModel;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure;

public class DataContext : DbContext
{
    protected override void OnConfiguring( DbContextOptionsBuilder options )
    {
        // in memory database used for simplicity, change to a real db for production applications
        options.UseInMemoryDatabase( "BabySwaggerDB" );
    }

    public DbSet<User> Users { get; set; }
}
