namespace CarFactory.Models.Color;

public class Gray : IColor
{
    public string Name => "Серый";
    public string PaintingType => "Матовый";

    public override string ToString()
    {
        return $"{Name}, тип покраски: {PaintingType.ToLower()}";
    }
}