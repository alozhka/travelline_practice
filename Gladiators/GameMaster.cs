using System.Diagnostics;
using Gladiators.Models.Fighters;

namespace Gladiators;

internal class GameMaster
{
    public static IFighter PlayAndGetWinner( IFighter firstFighter, IFighter secondFighter )
    {
        var round = 0;
        while ( true )
        {
            Console.WriteLine( $"Раунд {++round}." );

            // First fights second
            if (FightAndCheckIfOpponentDead( firstFighter, secondFighter ) )
            {
                return firstFighter;
            }

            // Second fights first
            if (FightAndCheckIfOpponentDead( secondFighter, firstFighter ) )
            {
                return secondFighter;
            }

            Console.WriteLine();
        }
    }

    private static bool FightAndCheckIfOpponentDead( IFighter roundOwner, IFighter opponent )
    {
        int damage = roundOwner.CalculateDamage();
        opponent.TakeDamage(damage);

        Console.WriteLine(
            $"Боец {opponent.Name} наносит {damage} урона. " +
            $"Боец {roundOwner.Name} получает {damage - opponent.CurrentArmor} урона," +
            $"количество жизней: {opponent.CurrentHealth}" );

        return opponent.CurrentHealth < 1;
    }
}