namespace Gladiators.Config;

public static class Constants
{
    public const decimal CriticalDamageMultiplicator = 2.9m;
    public const int CriticalDamagePercent = 15;
    public const int DamagePercentLow = 80;
    public const int DamagePercentHigh = 120;
}

public static class ParseRegexes
{
    public const string Name = "^[a-zA-Zа-яА-ЯёЁ]+$";
}