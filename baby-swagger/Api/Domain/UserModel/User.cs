namespace Api.Domain.UserModel;

public class User
{
    public int Id { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public Role Role { get; private set; }

    public User( string firstName, string lastName, string email, Role role )
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Role = role;
    }

    public void UpdateUserInfo( string firstName, string lastName, Role role )
    {
        FirstName = firstName;
        LastName = lastName;
        Role = role;
    }
}
