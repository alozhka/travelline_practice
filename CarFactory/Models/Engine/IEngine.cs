namespace CarFactory.Models.Engine;

public interface IEngine : IModel
{
    int CylinderVolume { get; }
    int CylindersAmount { get; }
}