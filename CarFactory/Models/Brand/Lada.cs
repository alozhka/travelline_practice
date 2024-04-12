namespace CarFactory.Models.Brand;

public class Lada : IBrand
{
    public string Name => "Лада";

    public override string ToString()
    {
        return Name;
    }
}