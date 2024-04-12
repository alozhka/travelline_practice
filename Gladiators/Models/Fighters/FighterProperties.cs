using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators.Models.Fighters;

public struct FighterProperties
{
    public FighterProperties(IWeapon weapon, IRace race, IArmor armor, IClass @class)
    {
        Weapon = weapon;
        Race = race;
        Armor = armor;
        Class = @class;
    }

    public IWeapon Weapon { get; }
    public IRace Race { get; }
    public IArmor Armor { get; }
    public IClass Class { get; }
}
