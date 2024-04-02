using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Text.Unicode;

namespace Dictionary;

public class ParsingHelper
{
    public static readonly JsonSerializerOptions Options = new()
    {
        Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic),
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
    
    private const string EnglishRegex = "^[a-z]+$";
    private const string RussianRegex = "^[а-яё]+$";
    public static string GetRussianWordFromConsole()
    {
        Console.Write("Введите слово: ");
        return GetWordFromConsoleByRegex(RussianRegex);
    }
    
    public static string GetEnglishWordFromConsole()
    {
        Console.Write("Введите перевод: ");
        return GetWordFromConsoleByRegex(EnglishRegex);
    }

    private static string GetWordFromConsoleByRegex(string regex)
    {
        while (true)
        {
            var word = Console.ReadLine();
            if (word is null || !Regex.IsMatch(word, regex))
            {
                Console.WriteLine("Неправильно введено слово!");
                continue;
            }

            return word.ToLower();
        }
    }
}