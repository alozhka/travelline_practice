namespace Gladiators.Models.Races;

public class Orc : IRace
{
    public string Name => "Огр";
    public int Damage => 15;
    public int Health => 120;
    public int Armor => 6;
    public int Initiative => 1;
}