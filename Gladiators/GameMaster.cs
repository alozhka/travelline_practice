using Gladiators.Models.Fighters;
using Gladiators.Service;

namespace Gladiators;

internal static class GameMaster
{
    public static IFighter PlayAndGetWinner( IFighter firstFighter, IFighter secondFighter )
    {
        int round = 0;
        while ( true )
        {
            Console.WriteLine( $"Раунд {++round}." );

            bool isFirstBetter = RandomService.CheckBestInitiative(firstFighter.Initiative, secondFighter.Initiative);
            if (isFirstBetter)
            {
                Console.WriteLine($"Инициатива за бойцом {firstFighter.Name}");
                if (FightAndCheckIfOpponentDead( firstFighter, secondFighter ) )
                {
                    return firstFighter;
                }
                if (FightAndCheckIfOpponentDead( secondFighter, firstFighter ) )
                {
                    return secondFighter;
                }
            }
            else
            {
                Console.WriteLine($"Инициатива за бойцом {secondFighter.Name}");
                if (FightAndCheckIfOpponentDead( secondFighter, firstFighter ) )
                {
                    return secondFighter;
                }
                if (FightAndCheckIfOpponentDead( firstFighter, secondFighter ) )
                {
                    return firstFighter;
                }
            }
            

            

            Console.WriteLine();
        }

    }

    private static bool FightAndCheckIfOpponentDead( IFighter roundOwner, IFighter opponent )
    {
        int damage = roundOwner.CalculateDamage();
        opponent.TakeDamage(damage);

        Console.WriteLine($"""
                           Боец {opponent.Name} наносит {damage} урона. 
                           Боец {roundOwner.Name} получает {damage - opponent.CurrentArmor} урона,
                           его количество жизней: {opponent.CurrentHealth}
                           """);

        return opponent.CurrentHealth < 1;
    }
}