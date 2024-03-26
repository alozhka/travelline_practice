using Gladiators.Models.Armors;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators.Models.Fighters
{
    public class Fighter : IFighter
    {
        public int MaxHealth => Race.Health;
        public int CurrentHealth { get; private set; }
        public int CurrentArmor { get; private set; }

        public string Name { get; }

        public IRace Race { get; }
        public IWeapon Weapon { get; private set; } = new NoWeapon();
        public IArmor Armor { get; private set; } = new NoArmor();

        public Fighter( string name, IRace race, IArmor? armor = null, IWeapon? weapon  = null )
        {
            Name = name;
            Race = race;
            CurrentHealth = MaxHealth;
            
            if (armor is not null)
            {
                Armor = armor;
            }

            if (weapon is not null)
            {
                Weapon = weapon;
            }

            CurrentArmor = Armor.Armor + Race.Armor;
        }

        public int CalculateDamage()
        {
            return Race.Damage + Weapon.Damage;
        }

        public void TakeDamage(int damage)
        {
            damage -= CurrentArmor;
            if(damage < 0)
            {
                damage = 0;
            }

            CurrentHealth -= damage;
            if (CurrentHealth < 0)
            {
                CurrentHealth = 0;
            }
        }
    }
}