using Gladiators.Models.Fighters;
using Gladiators.Service;

namespace Gladiators;

internal static class GameMaster
{
    public static IFighter PlayAndGetWinner(IList<IFighter> fighters)
    {
        int round = 0;
        while ( true )
        {
            Console.WriteLine( $"Раунд {++round}." );

            FighterService.SortByInitiative(fighters);
            Console.WriteLine("Инициатива от большего к меньшему: " + 
                              string.Join(", ", fighters.Select(f => f.Name)));
            
            // Самый боец выше инициативой наносит урон по инициативе ниже,
            // поэтому по самому неинициативному всегда ударят
            for (int i = 0; i < fighters.Count - 1; i++)
            {
                if (FightAndCheckIfOpponentDead(
                        fighters[i], 
                        fighters[RandomService.AtRange(i + 1, fighters.Count - 1)]))
                {
                    // Убираем, если проиграл
                    fighters.RemoveAt(i + 1);
                }
            }
            
            // Последний наносит удар рандомному, тем самым у самого инициативного большое преимущество
            if (FightAndCheckIfOpponentDead(
                    fighters.Last(),
                    fighters[RandomService.AtRange(0, fighters.Count - 2)]
                    ))
            {
                fighters.RemoveAt(-1);
            }

            if (fighters.Count == 1)
            {
                return fighters[0];
            }
            
            Console.WriteLine();
        }

    }

    private static bool FightAndCheckIfOpponentDead( IFighter roundOwner, IFighter opponent )
    {
        int damage = roundOwner.CalculateDamage();
        opponent.TakeDamage(damage);

        Console.WriteLine($"Боец {opponent.Name} наносит {damage} урона. " +
                          $"Боец {roundOwner.Name} получает {damage - opponent.CurrentArmor} урона, " +
                          $"его количество жизней: {opponent.CurrentHealth}");

        return opponent.CurrentHealth < 1;
    }
}