using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators.Models;

public static class StaticModels
{
    public static readonly IReadOnlyList<IWeapon> Weapons =
        [new NoWeapon(), new SilverSword(), new Mace(), new Staff()];

    public static readonly IReadOnlyList<IRace> Races = [new Human(), new Dwarf(), new Orc()];
    public static readonly IReadOnlyList<IClass> Classes = [new Knight(), new Wizard(), new Artificer()];

    public static readonly IReadOnlyList<IArmor> Armors =
        [new NoArmor(), new Scales(), new ChainMail(), new PlateArmor()];
}