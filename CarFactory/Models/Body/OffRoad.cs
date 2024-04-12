namespace CarFactory.Models.Body;

public class OffRoad : IBody
{
    public string Name => "Внедорожник";
    public decimal StreamliningRatio => 0.3m;

    public override string ToString()
    {
        return Name;
    }
}