namespace CarFactory.Models.Transmission;

public class ManualTransmission : ITransmission
{
    public string Name => "Механическая коробка передач";
    public int GearsAmount => 5;
    
    public override string ToString()
    {
        return $"{Name}, количество передач: {GearsAmount}";
    }
}