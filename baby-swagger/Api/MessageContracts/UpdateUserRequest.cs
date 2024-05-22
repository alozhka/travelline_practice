using System.ComponentModel.DataAnnotations;

namespace Api.MessageContracts;

public class UpdateUserRequest
{
    [Required] 
    public string FirstName { get; set; }

    [Required] 
    public string LastName { get; set; }

    [Required] 
    public Role Role { get; set; }
}
