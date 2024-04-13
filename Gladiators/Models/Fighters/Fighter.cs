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
            maxHealth: race.Health + @class.Health,
            combinedArmor: armor.Armor + race.Armor,
            combinedDamage: race.Damage + @class.Damage + weapon.Damage,
            initiative: race.Initiative + @class.Initiative
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
        State.TakeDamage(damage);
    }

    public void RestoreHealth()
    {
        State.RestoreHealth();
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
