namespace Gladiators.Models.Fighters
{
    public interface IFighter : IModel
    {
        public FighterState State { get; }

        public FighterProperties Properties { get; }

        public void TakeDamage(int damage);
        public int CalculateDamage();
        public void RestoreHealth();
    }
}