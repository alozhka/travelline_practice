using System.Text.RegularExpressions;
using Gladiators.Config;
using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Fighters;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators.Service;

public static class FighterService
{
    public static IFighter CreateByConsole()
    {
        return new Fighter( GetName(), GetRace(), GetClass(), GetArmor(), GetWeapon() );
    }


    private static string GetName()
    {
        while (true)
        {
            Console.Write("Введите имя бойца: ");
            string? name = Console.ReadLine();

            if (name is null || !Regex.IsMatch(name, ParseRegexes.Name))
            {
                Console.WriteLine("Неправильно введено имя!");
                continue;
            }

            return name;
        }
    }
    
    private static IWeapon GetWeapon()
    {
        while (true)
        {
            Console.WriteLine( """
                               Выберите оружие:
                               1. Без оружия
                               2. Булава
                               3. Посох
                               4. Меч
                               """);
            string? weaponStr = Console.ReadLine();
            if (!int.TryParse( weaponStr, out int weaponInt) || weaponInt is not (1 or 2 or 3 or 4) )
            {
                Console.WriteLine("Неправильно введена броня!");
                continue;
            }

            return weaponInt switch
            {
                1 => new NoWeapon(),
                2 => new Mace(),
                3 => new Staff(),
                4 => new Sword(),
                _ => throw new ArgumentOutOfRangeException(
                    nameof(weaponInt),
                    weaponInt,
                    "Неправильно введёно оружие")
            };
        }
    }
    private static IArmor GetArmor()
    {
        while (true)
        {
            Console.WriteLine( """
                               Выберите броню:
                               1. Без брони
                               2. Кольчуга
                               3. Чушуя
                               4. Латный доспех
                               """);
            string? armorStr = Console.ReadLine();
            if (!int.TryParse( armorStr, out int armorInt) || armorInt is not (1 or 2 or 3 or 4) )
            {
                Console.WriteLine("Неправильно введена броня!");
                continue;
            }

            return armorInt switch
            {
                1 => new NoArmor(),
                2 => new ChainMail(),
                3 => new Scales(),
                4 => new PlateArmor(),
                _ => throw new ArgumentOutOfRangeException(
                    nameof(armorInt),
                    armorInt,
                    "Неправильно введён класс")
            };
        }
    }
    private static IClass GetClass()
    {
        while (true)
        {
            Console.WriteLine( """
                               Выберите расу:
                               1. Рыцарь
                               2. Маг
                               3. Изобретатель
                               """);
            string? classStr = Console.ReadLine();
            if (!int.TryParse( classStr, out int classInt) || classInt is not (1 or 2 or 3) )
            {
                Console.WriteLine("Неправильно введён класс!");
                continue;
            }

            return classInt switch
            {
                1 => new Knight(),
                2 => new Wizard(),
                3 => new Artificer(),
                _ => throw new ArgumentOutOfRangeException(
                    nameof(classInt),
                    classInt,
                    "Неправильно введён класс")
            };
        }
    }
    private static IRace GetRace()
    {
        while (true)
        {
            Console.WriteLine( """
                               Выберите расу:
                               1. Человек
                               2. Орк
                               3. Гном
                               """);
            string? raceStr = Console.ReadLine();
            if ( !int.TryParse(raceStr, out int raceInt) || raceInt is not (1 or 2 or 3) )
            {
                Console.WriteLine("Неправильно введена раса!");
                continue;
            }

            return raceInt switch
            {
                1 => new Human(),
                2 => new Orc(),
                3 => new Dwarf(),
                _ => throw new ArgumentOutOfRangeException(
                    nameof(raceInt),
                    raceInt,
                    "Неправильно введён класс")
            };
        }
    }
}
