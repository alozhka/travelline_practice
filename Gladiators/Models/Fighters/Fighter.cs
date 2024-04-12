using Gladiators.Config;
using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;
using Gladiators.Service;

namespace Gladiators.Models.Fighters;

public class Fighter : IFighter
{
    public string Name { get; }
    public FighterState State { get; }
    public FighterProperties Properties { get; }

    public Fighter(string name, IRace race, IClass @class, IArmor armor, IWeapon weapon)
    {
        Name = name;
        Properties = new FighterProperties(weapon, race, armor, @class);
        
        State = new FighterState(
            maxHealth: Properties.Race.Health + Properties.Class.Health,
            combinedArmor: Properties.Armor.Armor + Properties.Race.Armor,
            combinedDamage: Properties.Race.Damage + Properties.Class.Damage + Properties.Weapon.Damage,
            initiative: Properties.Race.Initiative + Properties.Class.Initiative
            );
    }

    public int CalculateDamage()
    {
        decimal damageMul = RandomService.ComputeDamageMul();
        if (RandomService.IsCriticalDamage())
        {
            Console.WriteLine($"Боец {Name} наносит критический урон!");
            return (int)(State.CombinedDamage * Constants.CriticalDamageMultiplicator * damageMul);
        }

        return (int)(State.CombinedDamage * damageMul);
    }

    public void TakeDamage(int damage)
    {
        State.CurrentHealth -= Math.Max(damage - State.CombinedArmor, 0);
        if (State.CurrentHealth < 0)
        {
            State.CurrentHealth = 0;
        }
    }

    public void RestoreHealth()
    {
        State.CurrentHealth = State.MaxHealth;
    }

    public override string ToString()
    {
        return $"""
                Боец {Name}:
                Максимальное количество жизней: {State.MaxHealth}
                Текущий урон: {State.CombinedDamage}
                Текущая броня: {State.CombinedArmor}
                """;
    }
}
