namespace CarFactory.Models.Brand;

public class Subaru : IBrand
{
    public string Name => "Subaru";
    public override string ToString()
    {
        return Name;
    }
}