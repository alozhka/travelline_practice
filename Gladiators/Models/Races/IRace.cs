namespace Gladiators.Models.Races
{
    public interface IRace : IModel
    {
        int Damage { get; }
        int Health { get; }
        int Armor { get; }
    }
}