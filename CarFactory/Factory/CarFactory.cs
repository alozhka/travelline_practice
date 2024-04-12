using CarFactory.Models;
using CarFactory.Models.Body;
using CarFactory.Models.Brand;
using CarFactory.Models.Car;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Transmission;
using CarFactory.Service;

namespace CarFactory.Factory;

public static class CarFactory
{
    public static ICar CreateByConsole()
    {
        Console.Write("Выберите имя своей будущей машины: ");
        string name = ParsingService.GetName();

        Console.WriteLine("Выберите бренд:");
        IBrand brand = ParsingService.SelectSingleFromList(StaticModels.Brands);

        Console.WriteLine("Выберите кузов:");
        IBody body = ParsingService.SelectSingleFromList(StaticModels.Bodies);

        Console.WriteLine("Выберите двигатель:");
        IEngine engine = ParsingService.SelectSingleFromList(StaticModels.Engines);

        Console.WriteLine("Выберите коробку передач:");
        ITransmission transmission = ParsingService.SelectSingleFromList(StaticModels.Transmissions);

        Console.WriteLine("Выберите цвет:");
        IColor color = ParsingService.SelectSingleFromList(StaticModels.Colors);

        return new Car(name, brand, body, engine, transmission, color);
    }
}