using System.Diagnostics.CodeAnalysis;

namespace Accommodations.Models;

public class Booking
{
    public Booking(Guid id, 
        int userId, 
        DateTime startDate, 
        DateTime endDate, 
        RoomCategory roomCategory, 
        Currency currency, 
        decimal cost)
    {
        Id = id;
        UserId = userId;
        StartDate = startDate;
        EndDate = endDate;
        RoomCategory = roomCategory;
        Currency = currency;
        Cost = cost;
    }

    public Guid Id { get; private set; }
    public int UserId { get; private set; }
    public DateTime StartDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public RoomCategory RoomCategory { get; private set; }
    public Currency Currency { get; private set; }
    public decimal Cost { get; private set; }
}
