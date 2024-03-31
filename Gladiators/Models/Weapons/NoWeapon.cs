namespace Gladiators.Models.Weapons
{
    public class NoWeapon : IWeapon
    {
        public string Name => "Без оружия";
        public int Damage => 0;
    }
}