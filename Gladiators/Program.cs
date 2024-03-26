using System.Diagnostics;
using Gladiators.Models.Armors;
using Gladiators.Models.Fighters;
using Gladiators.Models.Races;

namespace Gladiators;

public static class Program
{
    public static void Main()
    {
        var firstFighter = new Fighter( "Jane", new Human() );
        var secondFighter = new Fighter( "Viktor", new Human(), new ChainMail() );

        var master = new GameMaster();
        var winner = master.PlayAndGetWinner( firstFighter, secondFighter );

        Console.WriteLine( $"Выигрывает {winner.Name}" );
    }
}

public class GameMaster
{
    public IFighter PlayAndGetWinner( IFighter firstFighter, IFighter secondFighter )
    {
        var round = 0;
        while ( true )
        {
            Console.WriteLine( $"Раунд {++round}." );

            // First fights second
            if ( FightAndCheckIfOpponentDead( firstFighter, secondFighter ) )
            {
                return firstFighter;
            }

            // Second fights first
            if ( FightAndCheckIfOpponentDead( secondFighter, firstFighter ) )
            {
                return secondFighter;
            }

            Console.WriteLine();
        }

        throw new UnreachableException();
    }

    private bool FightAndCheckIfOpponentDead( IFighter roundOwner, IFighter opponent )
    {
        int damage = roundOwner.CalculateDamage();
        opponent.TakeDamage(damage);

        Console.WriteLine(
            $"Боец {opponent.Name} получает {damage} урона. " +
            $"Количество жизней: {opponent.CurrentHealth}" );

        return opponent.CurrentHealth < 1;
    }
}