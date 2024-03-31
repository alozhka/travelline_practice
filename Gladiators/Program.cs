using System.Reflection;
using Gladiators.Models.Fighters;
using Gladiators.Service;

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
                case "Add":
                    break;
                case "Remove":
                    break;
                case "Fight":
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

    private static void Fight()
    {
        IFighter firstFighter = FighterService.CreateByConsole();
        IFighter secondFighter = FighterService.CreateByConsole();

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