using Gladiators.Models.Fighters;

namespace Gladiators.Service;

public static class FighterService
{
    public static void RestoreHealth(IEnumerable<IFighter> fighters)
    {
        foreach (IFighter fighter in fighters)
        {
            fighter.RestoreHealth();
        }
    }

    public static void SortByInitiative(IList<IFighter> fighters)
    {
        fighters = fighters.OrderBy(f => f.State.Initiative + RandomService.RollD20()).ToList();
    }
}