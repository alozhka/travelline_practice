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
            SelectSingleFromList("раса", StaticModels.Races), 
            SelectSingleFromList("класс", StaticModels.Classes),
            SelectSingleFromList("броня", StaticModels.Armors),
            SelectSingleFromList("класс", StaticModels.Weapons));
    }


    public static string GetName()
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
    
    private static T SelectSingleFromList<T>(string modelsType, IReadOnlyList<T> models) where T : IModel
    {
        while (true)
        {
            Console.WriteLine( $"""
                                Выберите из списка {modelsType}:
                                {string.Join("\n", models.Select((model, index) =>$"{index}. {model.Name}"))}
                                """);
            
            string? modelStr = Console.ReadLine();
            if (!int.TryParse( modelStr, out int modelInt) || modelInt < 0 || modelInt > models.Count - 1 )
            {
                Console.WriteLine($"Неправильно введен(о/а) {modelsType}!");
                continue;
            }

            return models[modelInt];
        }
    }
    
}
