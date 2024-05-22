namespace Api.Domain.UserModel;

public interface IUsersRepository
{
    Task<IReadOnlyList<User>> GetAll();
    Task<User?> Get( int id );
    Task Add( User user );
    void Update( User user );
    void Delete( User user );
    Task<User?> GetByEmail( string email );
}
