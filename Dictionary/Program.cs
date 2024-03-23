using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Text.Unicode;

namespace Dictionary;

using MyDictionary = Dictionary<string, string>;


internal class Program 
{
    private static readonly MyDictionary Translations;
    static Program()
    {
        Translations = LoadData();
    }
    
    public static void Main(string[] args)
    {
        ShowMenu();
        var command = Console.ReadLine();
        while (command != "Exit")
        {
            switch (command)
            {
                case "AddTranslation":
                    AddTranslation();
                    break;
                case "ChangeTranslation":
                    ChangeTranslation(); 
                    break;
                case "RemoveTranslation":
                    RemoveTranslation();
                    break;
                case "Translate":
                    Translate();
                    break;
                default:
                    Console.WriteLine("Неверно введена команда!");
                    break;
            }

            command = Console.ReadLine();
        }
        SaveData();
    }

    private static void Translate()
    {
        Console.Write("Введите слово: ");
        var word = Console.ReadLine();
        if (word is null || !Regex.IsMatch(word, "^[а-яёА-Я]+$"))
        {
            Console.WriteLine("Неправильно введено слово!");
            return;
        }

        word = word.ToLower();
        if (!Translations.TryGetValue(word, out var value))
        {
            Console.WriteLine("Такого слова нет в словаре!");
        }
        else
        {
            Console.WriteLine($"{word} - {value}");
        }
    }

    private static void RemoveTranslation()
    {
        Console.Write("Введите слово: ");
        var word = Console.ReadLine();
        if (word is null || !Regex.IsMatch(word, "^[а-яёА-Я]+$"))
        {
            Console.WriteLine("Неправильно введено слово!");
            return;
        }

        word = word.ToLower();
        if (!Translations.ContainsKey(word))
        {
            Console.WriteLine("Такого слова нет в словаре!");
        }
        else
        {
            Translations.Remove(word);
        }

        Console.WriteLine("Успешно.\n");
    }

    private static void ChangeTranslation()
    {
        Console.Write("Введите слово: ");
        var word = Console.ReadLine();
        if (word is null || !Regex.IsMatch(word, "^[а-яёА-Я]+$"))
        {
            Console.WriteLine("Неправильно введено слово!");
            return;
        }

        word = word.ToLower();
        if (Translations.ContainsKey(word))
        {
            Console.WriteLine("Перевод для этого слова уже существует!");
            return;
        }
        
        Console.Write("Введите перевод: ");
        var translation = Console.ReadLine();
        if (translation is null || !Regex.IsMatch(translation, "^[a-zA-Z]+$"))
        {
            Console.WriteLine("Неправильно введен перевод!");
            return;
        }

        Translations[word] = translation.ToLower();
        Console.WriteLine("Успешно.\n");
    }

    private static void AddTranslation()
    {
        Console.Write("Введите слово: ");
        var word = Console.ReadLine();
        if (word is null || !Regex.IsMatch(word, "^[а-яёА-Я]+$"))
        {
            Console.WriteLine("Неправильно введено слово!");
            return;
        }

        word = word.ToLower();
        if (Translations.ContainsKey(word))
        {
            Console.WriteLine("Перевод для этого слова уже существует!");
            return;
        }
        
        Console.Write("Введите перевод: ");
        var translation = Console.ReadLine();
        if (translation is null || !Regex.IsMatch(translation, "^[a-zA-Z]+$"))
        {
            Console.WriteLine("Неправильно введен перевод!");
            return;
        }

        Translations.Add(word, translation.ToLower());
        Console.WriteLine("Успешно.\n");
    }

    private static MyDictionary LoadData()
    {
        using var file = new FileStream("translations.json", FileMode.OpenOrCreate, FileAccess.Read);
        try
        {
            var data = JsonSerializer.Deserialize<MyDictionary>(file);
            return data ?? [];
        }
        catch (Exception)
        {
            return [];
        }
    }
    private static void SaveData()
    {
        using var file = new FileStream("translations.json", FileMode.Create, FileAccess.Write);
        JsonSerializer.Serialize(file, Translations, Options);
    }
    private static readonly JsonSerializerOptions Options = new()
    {
        Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic),
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    private static void ShowMenu()
    {
        Console.WriteLine("""
                          **********************************************
                                              Меню:
                          AddTranslation - добавить перевод
                          RemoveTranslation - удалить перевод
                          ChangeTranslation - обновить перевод
                          Translate - перевести
                          Exit - выход из программы
                          **********************************************
                          """);
    }
}