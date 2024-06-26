using Accommodations.Models;

namespace Accommodations;

public class BookingService : IBookingService
{
    private List<Booking> _bookings = [];

    private readonly IReadOnlyList<RoomCategory> _categories =
    [
        new("Standard", 100, 10),
        new("Deluxe", 200, 5)
    ];

    private readonly IReadOnlyList<User> _users =
    [
        new(1, "Alice Johnson"),
        new(2, "Bob Smith"),
        new(3, "Charlie Brown"),
        new(4, "Diana Prince"),
        new(5, "Evan Wright")
    ];

    public Booking Book(int userId, string categoryName, DateTime startDate, DateTime endDate, Currency currency)
    {
        if (endDate < startDate)
        {
            throw new ArgumentException("End date cannot be earlier than start date");
        }

        if (startDate <= DateTime.Now)
        {
            throw new ArgumentException("Start date cannot be earlier than now date");
        }

        RoomCategory? selectedCategory = _categories.FirstOrDefault(c => c.Name == categoryName);
        if (selectedCategory == null)
        {
            throw new ArgumentException("Category not found");
        }

        if (selectedCategory.AvailableRooms <= 0)
        {
            throw new ArgumentException("No available rooms");
        }

        User? user = _users.FirstOrDefault(u => u.Id == userId);
        if (user == null)
        {
            throw new ArgumentException("User not found");
        }

        int days = (endDate - startDate).Days;
        decimal currencyRate = GetCurrencyRate(currency);
        decimal totalCost = CalculateBookingCost(selectedCategory.BaseRate, days, userId, currencyRate);

        Booking booking = new(Guid.NewGuid(), userId, startDate, endDate, selectedCategory, currency, totalCost);

        _bookings.Add(booking);
        selectedCategory.AvailableRooms--;

        return booking;
    }

    public void CancelBooking(Guid bookingId)
    {
        Booking? booking = _bookings.FirstOrDefault(b => b.Id == bookingId);
        if (booking == null)
        {
            throw new ArgumentException($"Booking with id: '{bookingId}' does not exist");
        }

        if (booking.StartDate <= DateTime.Now)
        {
            throw new ArgumentException("Start date cannot be earlier than now date");
        }

        Console.WriteLine($"Refund of {booking.Cost} {booking.Currency}");
        _bookings.Remove(booking);
        RoomCategory category = _categories.First(c => c.Name == booking.RoomCategory.Name);
        category.AvailableRooms++;
    }

    private static decimal CalculateDiscount(int userId)
    {
        return 0.1m;
    }

    public Booking? FindBookingById(Guid bookingId)
    {
        return _bookings.FirstOrDefault(b => b.Id == bookingId);
    }

    public IEnumerable<Booking> SearchBookings(DateTime startDate, DateTime endDate, string categoryName)
    {
        IQueryable<Booking> query = _bookings
            .AsQueryable()
            .Where(b => b.StartDate >= startDate && b.EndDate <= endDate);

        if (!string.IsNullOrEmpty(categoryName))
        {
            query = query.Where(b => b.RoomCategory.Name == categoryName);
        }

        return query.ToList();
    }

    public decimal CalculateCancellationPenaltyAmount(Booking booking)
    {
        if (DateTime.Now <= booking.StartDate)
        {
            throw new ArgumentException("Can`t book earlier than the current time");
        }

        int daysBeforeArrival = (booking.StartDate - DateTime.Now).Days;

        return 5000.0m * GetCurrencyRate(booking.Currency) / daysBeforeArrival;
    }

    private static decimal GetCurrencyRate(Currency currency)
    {
        Random rand = new();
        decimal currencyRate = 1m;
        currencyRate *= currency switch
        {
            Currency.Usd => (decimal)(1 / (92 + rand.NextDouble() * 5)), // 92 +- 5
            Currency.Cny => (decimal)(1 / (12 + rand.NextDouble() * 2)), // 12 +- 2
            Currency.Rub => 1m,
            _ => throw new ArgumentOutOfRangeException(nameof(currency), currency, null)
        };

        return currencyRate;
    }

    private static decimal CalculateBookingCost(decimal baseRate, int days, int userId, decimal currencyRate)
    {
        decimal cost = baseRate * days;
        decimal totalCost = cost * (1 - CalculateDiscount(userId)) * currencyRate;
        return totalCost;
    }
}
