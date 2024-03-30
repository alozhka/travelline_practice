using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Fighters;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

namespace Gladiators;

public static class Program
{
    public static void Main()
    {
        var firstFighter = new Fighter( 
            "Jane", 
            new Human(),
            new ChainMail(), 
            new Mace(), 
            new Wizard() );
        
        var secondFighter = new Fighter( 
            "Viktor", 
            new Human(), 
            new ChainMail(), 
            new NoWeapon(), 
            new Knight() );

        var winner = GameMaster.PlayAndGetWinner( firstFighter, secondFighter );

        Console.WriteLine( $"\nВыигрывает {winner.Name}" );
    }
}