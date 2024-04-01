using Gladiators.Config;
using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;
using Gladiators.Service;

namespace Gladiators.Models.Fighters
{
    public class Fighter : IFighter
    {
        public int MaxHealth { get; }
        public int CurrentHealth { get; private set; }
        public int CurrentArmor { get; }
        public int CurrentDamage { get; }

        public string Name { get; }
        public int Initiative { get; }

        public IRace Race { get; }
        public IWeapon Weapon { get; }
        public IArmor Armor { get; }
        public IClass Class { get; }

        public Fighter( string name, IRace race, IClass @class, IArmor armor, IWeapon weapon )
        {
            Name = name;
            Race = race;
            Armor = armor;
            Weapon = weapon;
            Class = @class;
            
            MaxHealth = Race.Health + Class.Health;
            CurrentHealth = MaxHealth;
            CurrentDamage = Race.Damage + Class.Damage + Weapon.Damage;
            CurrentArmor = Armor.Armor + Race.Armor;
            Initiative = Race.Initiative + Class.Initiative;
        }

        public int CalculateDamage()
        {
            decimal damageMul = RandomService.ComputeDamageMul();
            if (RandomService.IsCriticalDamage())
            {
                Console.WriteLine($"{Name} наносит критический урон!");
                return (int) (CurrentDamage * Constants.CriticalDamageMultiplicator * damageMul);
            }
            return (int) (CurrentDamage * damageMul);
        }

        public void TakeDamage(int damage)
        {
            CurrentHealth -= Math.Max(damage - CurrentArmor, 0);
            if (CurrentHealth < 0)
            {
                CurrentHealth = 0;
            }
        }

        public override string ToString()
        {
            return $"""
                    Боец {Name}:
                    Максимальное количество жизней: {MaxHealth}
                    Текущий урон: {CurrentDamage}
                    Текущая броня: {CurrentArmor}
                    """;
        }
    }
}