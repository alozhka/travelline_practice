using System.ComponentModel.DataAnnotations;

namespace Api.MessageContracts;

public class CreateUserRequest
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    public Role Role { get; set; }
}
