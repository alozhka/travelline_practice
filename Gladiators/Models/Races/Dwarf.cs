namespace Gladiators.Models.Races;

public class Dwarf : IRace
{
    public string Name => "Гном";
    public int Damage => 8;
    public int Health => 90;
    public int Armor => 4;
    public int Initiative => 3;
}