namespace Gladiators.Models.Fighters;

public record FighterState
{
    public FighterState(int maxHealth, int combinedArmor, int combinedDamage, int initiative)
    {
        MaxHealth = maxHealth;
        CurrentHealth = maxHealth;
        CombinedArmor = combinedArmor;
        CombinedDamage = combinedDamage;
        Initiative = initiative;
    }

    public int MaxHealth { get; }
    public int CurrentHealth { get; set; } //TODO: фигня, надо поправить
    public int CombinedArmor { get; }
    public int CombinedDamage { get; }
    public int Initiative { get; }

    public void TakeDamage(int damage)
    {
        CurrentHealth -= Math.Max(damage - CombinedArmor, 0);
        if (CurrentHealth < 0)
        {
            CurrentHealth = 0;
        }
    }
}
