using Api.Domain.UserModel;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure.Repositories;

public class UsersRepository( DataContext context ) : IUsersRepository
{
    public async Task<IReadOnlyList<User>> GetAll()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<User?> Get( int id )
    {
        return await context.Users.SingleOrDefaultAsync( x => x.Id == id );
    }

    public async Task Add( User user )
    {
        // save user
        await context.Users.AddAsync( user );
        await context.SaveChangesAsync();
    }

    public void Update( User user )
    {
        context.Users.Update( user );
        context.SaveChanges();
    }

    public void Delete( User user )
    {
        context.Users.Remove( user );
        context.SaveChanges();
    }

    public async Task<User?> GetByEmail( string email )
    {
        return await context.Users.SingleOrDefaultAsync( x =>
            x.Email.Equals( email, StringComparison.CurrentCultureIgnoreCase ) );
    }
}
