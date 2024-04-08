namespace CarFactory.Models.Body;

public class Sedan : IBody
{
    public string Name => "Седан";
    public decimal StreamliningRatio => 0.8m;

    public override string ToString()
    {
        return Name;
    }
}