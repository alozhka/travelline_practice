namespace CarFactory.Models.Transmission;

public class AutomaticTransmission : ITransmission
{
    public string Name => "Автоматическая коробка передач";
    public int GearsAmount => 6;

    public override string ToString()
    {
        return $"{Name}, количество передач: {GearsAmount}";
    }
}