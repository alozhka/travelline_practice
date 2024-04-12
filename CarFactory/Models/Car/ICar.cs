using CarFactory.Models.Body;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Transmission;

namespace CarFactory.Models.Car;

public interface ICar : IModel
{
    int MaxSpeed { get; }
    IBody Body { get; }
    IEngine Engine { get; }
    ITransmission Transmission { get; }
    IColor Color { get; }
}