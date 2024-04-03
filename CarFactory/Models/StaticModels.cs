using CarFactory.Models.Body;
using CarFactory.Models.Brand;
using CarFactory.Models.Color;
using CarFactory.Models.Engine;
using CarFactory.Models.Transmission;

namespace CarFactory.Models;

public class StaticModels
{
    public static readonly IReadOnlyList<ITransmission> Transmissions = 
        [new ManualTransmission(), new AutomaticTransmission()];

    public static readonly IReadOnlyList<IBody> Bodies = [ new Sedan(), new Hatchback(), new OffRoad() ];

    public static readonly IReadOnlyList<IEngine> Engines = [ new Vaz21116(), new BmwM50() ];
    public static readonly IReadOnlyList<IColor> Colors = [ new Gray(), new Yellow() ];
    public static readonly IReadOnlyList<IBrand> Brands = [ new Lada(), new Subaru(), new Ford() ];
}


