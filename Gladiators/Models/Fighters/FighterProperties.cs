using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators.Models.Fighters;

// пока оставил readonly, т.к. на текущий момент после инциализации 
// ничего из списка ниже не меняется
public readonly struct FighterProperties
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
