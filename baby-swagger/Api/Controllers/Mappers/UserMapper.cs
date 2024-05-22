using Api.Domain.UserModel;
using Api.MessageContracts;
using Role = Api.Domain.UserModel.Role;

namespace Api.Controllers.Mappers;

public static class UserMapper
{
    public static Role Map( this MessageContracts.Role role )
    {
        switch ( role )
        {
            case MessageContracts.Role.Admin:
                return Role.Admin;
            case MessageContracts.Role.User:
                return Role.User;
            default:
                throw new ArgumentOutOfRangeException( nameof( role ), role, null );
        }
    }

    public static User Map( this CreateUserRequest request )
    {
        return new User( request.FirstName, request.LastName, request.Email, request.Role.Map() );
    }
}
