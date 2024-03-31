using Gladiators.Factory;
using Gladiators.Models.Fighters;

namespace Gladiators;

public static class Program
{
    public static void Main()
    {
        ShowMenu();
        string? command = Console.ReadLine();

        while (command != "Exit")
        {
            switch (command)
            {
                case "1":
                    Add();
                    break;
                case "2":
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

    private static void Add()
    {
        FighterFactory.CreateByConsole();
    }
    private static void Fight()
    {
        IFighter firstFighter = FighterFactory.CreateByConsole();
        IFighter secondFighter = FighterFactory.CreateByConsole();

        Console.WriteLine($"{firstFighter}\n{secondFighter}");
        
        IFighter winner = GameMaster.PlayAndGetWinner( firstFighter, secondFighter );

        Console.WriteLine( $"\nВыигрывает {winner.Name}" );
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