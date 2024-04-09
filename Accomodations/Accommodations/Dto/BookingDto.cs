namespace Accommodations.Dto;

public class BookingDto
{
    public int UserId { get; init; }
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    public /*required*/ string Category { get; init; }
    public CurrencyDto Currency { get; init; }
}
