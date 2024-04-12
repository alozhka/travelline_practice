using Gladiators.Models.Armors;
using Gladiators.Models.Class;
using Gladiators.Models.Races;
using Gladiators.Models.Weapons;

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