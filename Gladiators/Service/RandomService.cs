using Gladiators.Config;

namespace Gladiators.Service;

public static class RandomService
{
    private static readonly Random Rand = new();

    private static int RollD20()
    {
        return Rand.Next(0, 21);
    }

    public static decimal ComputeDamageMul()
    {
        return (Rand.Next(Constants.DamagePercentLow, Constants.DamagePercentHigh) + 1) / 100m;
    }

    public static bool IsCriticalDamage()
    {
        return Rand.Next(100) < Constants.CriticalDamagePercent;
    }

    public static bool CheckBestInitiative(int initiative1, int initiative2)
    {
        int roll1 = RollD20();
        int roll2 = RollD20();

        return (roll1 + initiative1) > (roll2 + initiative2);
    }
}