namespace CarFactory.Models.Brand;

public class Ford : IBrand
{
    public string Name => "Ford";
    public override string ToString()
    {
        return Name;
    }
}