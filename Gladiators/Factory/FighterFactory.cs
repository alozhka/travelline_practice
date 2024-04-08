using Gladiators.Models;
using Gladiators.Models.Fighters;
using Gladiators.Service;

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

            if (name is null || !ValidationService.IsValidName(name))
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
            Console.WriteLine($"""
                               Выберите из списка {modelsType}:
                               {string.Join("\n", models.Select((model, index) => $"{index}. {model.Name}"))}
                               """);

            string? modelStr = Console.ReadLine();
            if (!int.TryParse(modelStr, out int modelInt) || modelInt < 0 || modelInt > models.Count - 1)
            {
                Console.WriteLine($"Неправильно введен(о/а) {modelsType}!");
                continue;
            }

            return models[modelInt];
        }
    }
}