namespace Accommodations.Dto;

public class BookingDto
{
    public BookingDto(int userId, string category, DateTime startDate, DateTime endDate, CurrencyDto currency)
    {
        UserId = userId;
        Category = category;
        StartDate = startDate;
        EndDate = endDate;
        Currency = currency;
    }

    public int UserId { get; init; }
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    public string Category { get; init; }
    public CurrencyDto Currency { get; init; }
}
