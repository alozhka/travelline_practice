using Gladiators.Config;

namespace Gladiators.Service;

public static class RandomService
{
    private static readonly Random Rand = new();

    public static int RollD20()
    {
        return Rand.Next(1, 21);
    }

    /**
     * Возвращает число рандомное целое число в отрезке [min; max]
     */
    public static int AtRange(int min, int max)
    {
        return Rand.Next(min, max + 1);
    }

    public static decimal ComputeDamageMul()
    {
        return (Rand.Next(Constants.DamagePercentLow, Constants.DamagePercentHigh) + 1) / 100m;
    }

    public static bool IsCriticalDamage()
    {
        return Rand.Next(100) < Constants.CriticalDamagePercent;
    }
}