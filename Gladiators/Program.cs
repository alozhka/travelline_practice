using System.Text.RegularExpressions;
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

        while (command != "Exit")
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
                    ShowMenu();
                    break;
            }

            command = Console.ReadLine();
        }
    }

    private static void AddFighter()
    {
        Fighters.Add(FighterFactory.CreateByConsole());
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
            Console.WriteLine("Успешно");
        }
    }
    private static void Fight()
    {
        Console.WriteLine(string.Join("\n", Fighters));
        
        //IFighter winner = GameMaster.PlayAndGetWinner( firstFighter, secondFighter );

        //Console.WriteLine( $"\nВыигрывает {winner.Name}" );
    }

    private static void ShowMenu()
    {
        Console.WriteLine("""
                          Меню:
                          1 -> Бобавить бойца
                          2 -> Удалить бойца
                          3 -> Симулировать сражение
                          """);
    }
}