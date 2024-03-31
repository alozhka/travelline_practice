namespace Gladiators.Models.Class;

public interface IClass : IModel
{
    public int Damage { get; }
    public int Health { get; }
}