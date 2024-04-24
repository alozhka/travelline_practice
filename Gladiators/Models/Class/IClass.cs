namespace Gladiators.Models.Class;

public interface IClass : IModel
{
    int Damage { get; }
    int Health { get; }
    int Initiative { get; }
}