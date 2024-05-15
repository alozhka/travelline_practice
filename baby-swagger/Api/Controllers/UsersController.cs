using Api.Controllers.Mappers;
using Api.Domain.UserModel;
using Api.MessageContracts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route( "[controller]" )]
public class UsersController : Controller
{
    private readonly IUsersRepository _usersRepository;

    public UsersController( IUsersRepository usersRepository )
    {
        _usersRepository = usersRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        IReadOnlyList<User> users = await _usersRepository.GetAll();

        return Ok( users );
    }

    [HttpGet( "{id}" )]
    public async Task<IActionResult> Get( int id )
    {
        User? user = await _usersRepository.Get( id );

        if ( user is null )
        {
            return NotFound();
        }

        return Ok( user );
    }

    [HttpGet( "get-by-email/{email}" )]
    public async Task<IActionResult> GetByEmail( string email )
    {
        User? user = await _usersRepository.GetByEmail( email );

        if ( user is null )
        {
            return NotFound();
        }

        return Ok( user );
    }

    [HttpPost]
    public async Task<IActionResult> Create( [FromBody] CreateUserRequest request )
    {
        if ( !ModelState.IsValid )
        {
            return BadRequest();
        }

        User? user = await _usersRepository.GetByEmail( request.Email );

        if ( user is not null )
        {
            return BadRequest();
        }

        await _usersRepository.Add( request.Map() );

        return Ok( new { message = "User created" } );
    }

    [HttpPut( "{id}" )]
    public async Task<IActionResult> Update( int id, UpdateUserRequest request )
    {
        if ( !ModelState.IsValid )
        {
            return BadRequest();
        }

        User? user = await _usersRepository.Get( id );

        if ( user is null )
        {
            return NotFound();
        }

        user.UpdateUserInfo( request.FirstName, request.LastName, request.Role.Map() );

        _usersRepository.Update( user );

        return Ok( new { message = "User updated" } );
    }

    [HttpDelete( "{id}" )]
    public async Task<IActionResult> Delete( int id )
    {
        User? user = await _usersRepository.Get( id );

        if ( user is null )
        {
            return NotFound();
        }

        _usersRepository.Delete( user );

        return Ok( new { message = "User deleted" } );
    }
}
