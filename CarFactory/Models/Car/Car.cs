using CarFactory.Config;
using CarFactory.Models.Body;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Transmission;

namespace CarFactory.Models.Car;

public class Car : ICar
{
    public Car(string name, IBrand brand, IBody body, IEngine engine, ITransmission transmission, IColor color)
    {
        Name = name;
        Brand = brand;
        Body = body;
        Engine = engine;
        Transmission = transmission;
        Color = color;

        MaxSpeed = ComputeMaxSpeed();
    }

    public string Name { get; }
    public int MaxSpeed { get; }

    public IBrand Brand { get; }
    public IBody Body { get; }
    public IEngine Engine { get; }
    public ITransmission Transmission { get; }
    public IColor Color { get; }

    private int ComputeMaxSpeed()
    {
        decimal d = Transmission.GearsAmount
                    * ((Engine.CylinderVolume / 1000m) * Engine.CylindersAmount * Constants.EnginePowerMultiplier)
                    * Body.StreamliningRatio;
        return (int)d;
    }

    public override string ToString()
    {
        return $"""
                Имя: {Name};
                Бренд: {Brand};
                Кузов: {Body};
                Двигатель: {Engine};
                Коробка передач: {Transmission};
                Максимальная скорость: {MaxSpeed};
                Цвет: {Color};
                """;
    }
}