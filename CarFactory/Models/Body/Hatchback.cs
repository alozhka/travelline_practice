namespace CarFactory.Models.Body;

public class Hatchback : IBody
{
    public string Name => "Хэтчбек";
    public decimal StreamliningRatio => 0.6m;
    
    public override string ToString()
    {
        return Name;
    }
}