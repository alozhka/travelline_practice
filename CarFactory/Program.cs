using CarFactory.Models.Car;

namespace CarFactory;

internal static class Program
{
    public static void Main()
    {
        ICar car = Factory.CarFactory.CreateByConsole();

        Console.WriteLine(car);
    }
}