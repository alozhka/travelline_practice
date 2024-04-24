namespace Gladiators.Models.Races
{
    public class Human : IRace
    {
        public string Name => "Человек";
        public int Damage => 11;
        public int Health => 100;
        public int Armor => 3;
        public int Initiative => 2;
    }
}