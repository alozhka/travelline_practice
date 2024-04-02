using System.Text.Json;

namespace Dictionary;

using MyDictionary = Dictionary<string, string>;


internal static class Program
{
    private static MyDictionary _translations;
    private static string _filePath;
    
    public static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            Console.WriteLine("Отсутствует название файла");
            return;
        }

        _filePath = args[0];
        _translations = LoadData();

        ShowMenu();
        string? command = Console.ReadLine();
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
        string word = ParsingHelper.GetRussianWordFromConsole();

        if (!_translations.TryGetValue(word, out var value))
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
        string word = ParsingHelper.GetRussianWordFromConsole();

        if (!_translations.ContainsKey(word))
        {
            Console.WriteLine("Такого слова нет в словаре!");
        }
        else
        {
            _translations.Remove(word);
        }

        ShowSuccessMessage();
    }

    private static void ChangeTranslation()
    {
        string word = ParsingHelper.GetRussianWordFromConsole();
        if (_translations.ContainsKey(word))
        {
            Console.WriteLine("Перевод для этого слова уже существует!");
            return;
        }

        string translation = ParsingHelper.GetEnglishWordFromConsole();

        _translations[word] = translation;
        ShowSuccessMessage();
    }

    private static void AddTranslation()
    {
        string word = ParsingHelper.GetRussianWordFromConsole();

        if (_translations.ContainsKey(word))
        {
            Console.WriteLine("Перевод для этого слова уже существует!");
            return;
        }

        string translation = ParsingHelper.GetEnglishWordFromConsole();

        _translations.Add(word, translation);
        ShowSuccessMessage();
    }

    private static MyDictionary LoadData()
    {
        using var file = new FileStream(_filePath, FileMode.OpenOrCreate, FileAccess.Read);
        try
        {
            var data = JsonSerializer.Deserialize<MyDictionary>(file);
            return data ?? [];
        }
        catch (JsonException)
        {
            return [];
        }
    }
    private static void SaveData()
    {
        using var file = new FileStream(_filePath, FileMode.Create, FileAccess.Write);
        JsonSerializer.Serialize(file, _translations, ParsingHelper.Options);
    }

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

    private static void ShowSuccessMessage()
    {
        Console.WriteLine("Успешно\n");
    }
}