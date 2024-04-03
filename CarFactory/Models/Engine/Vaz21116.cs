namespace CarFactory.Models.Engine;

public class Vaz21116 : IEngine
{
    public string Name => "ВАЗ-21116";
    public int CylinderVolume => 1600;
    public int CylindersAmount => 4;

    public override string ToString()
    {
        return $"{Name}, количество цилиндров: {CylindersAmount}, объём одного цилиндра: {CylinderVolume}см^3";
    }
}