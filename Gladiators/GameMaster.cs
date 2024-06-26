using Gladiators.Models.Fighters;
using Gladiators.Service;

namespace Gladiators;

internal static class GameMaster
{
    public static IFighter PlayAndGetWinner(IList<IFighter> fighters)
    {
        int round = 0;

        while (true)
        {
            Console.WriteLine($"Раунд {++round}.");

            FighterService.SortByInitiative(fighters);
            Console.WriteLine("Инициатива от большего к меньшему: " +
                              string.Join(", ", fighters.Select(f => f.Name)));

            // Самый боец выше инициативой наносит урон по инициативе ниже,
            // поэтому по самому неинициативному всегда ударят
            for (int i = 0; i < fighters.Count - 1; i++)
            {
                int opponentIndex = RandomService.AtRange(i + 1, fighters.Count - 1);
                if (FightAndCheckIfOpponentDead(
                        fighters[i],
                        fighters[opponentIndex]))
                {
                    // Убираем, если проиграл
                    fighters.RemoveAt(opponentIndex);
                }
            }

            // Последний наносит удар рандомному, тем самым у самого инициативного большое преимущество
            if (FightAndCheckIfOpponentDead(
                    fighters.Last(),
                    fighters[RandomService.AtRange(0, fighters.Count - 2)]))
            {
                fighters.RemoveAt(-1);
            }

            if (fighters.Count == 1)
            {
                return fighters[0];
            }

            FighterService.RestoreHealth(fighters);
            Console.WriteLine();
        }
    }

    private static bool FightAndCheckIfOpponentDead(IFighter roundOwner, IFighter opponent)
    {
        int damage = roundOwner.CalculateDamage();
        opponent.TakeDamage(damage);

        Console.WriteLine($"Боец {opponent.Name} наносит {damage} урона. " +
                          $"Боец {roundOwner.Name} получает {damage - opponent.State.CombinedArmor} урона, " +
                          $"его количество жизней: {opponent.State.CurrentHealth}");

        return opponent.State.CurrentHealth < 1;
    }
}
