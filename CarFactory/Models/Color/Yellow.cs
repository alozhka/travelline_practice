namespace CarFactory.Models.Color;

public class Yellow : IColor
{
    public string Name => "Желтый";
    public string PaintingType => "Металлик";

    public override string ToString()
    {
        return $"{Name}, тип покраски: {PaintingType.ToLower()}";
    }
}