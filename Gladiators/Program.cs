using Gladiators.Factory;
using Gladiators.Models.Fighters;
using Gladiators.Service;

namespace Gladiators;

public static class Program
{
    private static List<IFighter> Fighters { get; } = [];

    public static void Main()
    {
        ShowMenu();
        string? command = Console.ReadLine();

        while (command != "4")
        {
            switch (command)
            {
                case "1":
                    AddFighter();
                    break;
                case "2":
                    RemoveFighter();
                    break;
                case "3":
                    Fight();
                    break;
                default:
                    Console.WriteLine("Неправильно введена команда!");
                    break;
            }

            ShowMenu();
            command = Console.ReadLine();
        }
    }

    private static void AddFighter()
    {
        Fighters.Add(FighterFactory.CreateByConsole());
        ShowSuccessResult();
    }

    private static void RemoveFighter()
    {
        string name = FighterFactory.GetName();

        int index = Fighters.FindIndex(f => f.Name == name);

        if (index == -1)
        {
            Console.WriteLine("Такого бойца не существует!");
        }
        else
        {
            Fighters.RemoveAt(index);
            ShowSuccessResult();
        }
    }

    private static void Fight()
    {
        if (Fighters.Count < 2)
        {
            Console.WriteLine("Вы ввели недостаточное количество бойцов!");
            return;
        }

        Console.WriteLine("\n" + string.Join("\n\n", Fighters) + "\n");

        IFighter winner = GameMaster.PlayAndGetWinner(Fighters);
        Console.WriteLine($"\nВыигрывает {winner.Name}");

        FighterService.RestoreHealth(Fighters);
    }

    private static void ShowMenu()
    {
        Console.WriteLine("""

                          Меню:
                          1 -> Добавить бойца
                          2 -> Удалить бойца
                          3 -> Симулировать сражение
                          4 -> Выход

                          """);
    }

    private static void ShowSuccessResult()
    {
        Console.WriteLine("Успешно");
    }
}