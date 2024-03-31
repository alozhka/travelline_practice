using System.Text.RegularExpressions;
using Gladiators.Config;
using Gladiators.Models;
using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Fighters;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators.Factory;

public static class FighterFactory
{
    public static IFighter CreateByConsole()
    {
        return new Fighter( 
            GetName(), 
            SelectSingleFromModels<IRace>("раса", StaticModels.Races), 
            SelectSingleFromModels<IClass>("класс", StaticModels.Classes),
            SelectSingleFromModels<IArmor>("броня", StaticModels.Armors),
            SelectSingleFromModels<IWeapon>("класс", StaticModels.Weapons));
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
    
    private static T SelectSingleFromModels<T>(string modelsType, IReadOnlyList<IModel> models) where T : IModel
    {
        while (true)
        {
            Console.WriteLine( $"""
                                Выберите из списка {modelsType}:
                                {string.Join("\n", models.Select((model, index) =>$"{index}. {model.Name}"))}
                                """);
            
            string? modelStr = Console.ReadLine();
            if (!int.TryParse( modelStr, out int modelInt) || modelInt < 0 || modelInt > models.Count )
            {
                Console.WriteLine($"Неправильно введен(о/а) {modelsType}!");
                continue;
            }

            return (T) models[modelInt];
        }
    }
    
}
