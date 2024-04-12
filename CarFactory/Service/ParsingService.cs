using System.Text.RegularExpressions;
using CarFactory.Models;

namespace CarFactory.Service;

public class ParsingService
{
    private const string NameRegex = "^[a-zA-Zа-яА-ЯёЁ]+$";

    public static string GetName()
    {
        while (true)
        {
            string? name = Console.ReadLine();

            if (name is null || !Regex.IsMatch(name, NameRegex))
            {
                Console.WriteLine("Неправильно введено имя!");
                continue;
            }

            return name;
        }
    }

    public static T SelectSingleFromList<T>(IReadOnlyList<T> models) where T : IModel
    {
        while (true)
        {
            Console.WriteLine(
                $"{string.Join("\n", models.Select((model, index) => $"{index}. {model.Name}"))}");

            string? modelStr = Console.ReadLine();
            if (!int.TryParse(modelStr, out int modelInt) || modelInt < 0 || modelInt > models.Count - 1)
            {
                Console.WriteLine("Введены неверные данные!");
                continue;
            }

            return models[modelInt];
        }
    }
}