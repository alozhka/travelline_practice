namespace Accommodations.Models;

public class RoomCategory
{
    public RoomCategory(string name, decimal baseRate, int availableRooms)
    {
        Name = name;
        BaseRate = baseRate;
        AvailableRooms = availableRooms;
    }

    public string Name { get; init; }
    public decimal BaseRate { get; init; }
    public int AvailableRooms { get; set; }

    public override string ToString()
    {
        return Name;
    }
}
