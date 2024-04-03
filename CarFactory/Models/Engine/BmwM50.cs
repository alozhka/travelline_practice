namespace CarFactory.Models.Engine;

public class BmwM50 : IEngine
{
    public string Name => "BMW M50";
    public int CylinderVolume => 1991;
    public int CylindersAmount => 6;
    
    public override string ToString()
    {
        return $"{Name}, количество цилиндров: {CylindersAmount}, объём одного цилиндра: {CylinderVolume}см^3";
    }
}