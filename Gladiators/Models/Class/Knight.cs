namespace Gladiators.Models.Class;

public class Knight : IClass
{
    public string Name => "Рыцарь";
    public int Damage => 3;
    public int Health => 10;
    public int Initiative => 1;
}