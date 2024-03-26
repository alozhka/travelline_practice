namespace Gladiators.Models.Races
{
    public class Human : IRace
    {
        public int Damage { get; } = 11;

        public int Health { get; } = 100;

        public int Armor { get; } = 10;
    }
}