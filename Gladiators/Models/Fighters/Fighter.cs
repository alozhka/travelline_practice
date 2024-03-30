using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators.Models.Fighters
{
    public class Fighter : IFighter
    {
        public int MaxHealth { get; }
        public int CurrentHealth { get; private set; }
        public int CurrentArmor { get; }
        public int CurrentDamage { get; }

        public string Name { get; }

        public IRace Race { get; }
        public IWeapon Weapon { get; }
        public IArmor Armor { get; }
        public IClass Class { get; }

        public Fighter( string name, IRace race, IArmor armor, IWeapon weapon, IClass @class )
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
        }

        public int CalculateDamage()
        {
            return CurrentDamage;
        }

        public void TakeDamage(int damage)
        {
            CurrentHealth -= Math.Max(damage - CurrentArmor, 0);
            if (CurrentHealth < 0)
            {
                CurrentHealth = 0;
            }
        }
    }
}