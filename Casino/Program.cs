namespace Casino;

internal static class Program
{
    private const int Multiplicator = 10;
    private const int MaxRangomNubmer = 20;
    private static readonly IEnumerable<int> WinningValues = new[] { 18, 19, 20 };
    
    public static void Main()
    {
        Random rand = new Random();
        decimal balance = 10000;
        
        while (balance > 0)
        {
            Console.WriteLine($"\nБаланс: {balance}");
            Console.Write("Введите ставку: ");
            bool isValidBet = int.TryParse(Console.ReadLine(), out int bet);
            if (!isValidBet)
            {
                Console.WriteLine("Введены неверные данные!");
                continue;
            }

            if (bet > balance)
            {
                Console.WriteLine("Недостаточно денег для ставки!");
            }
            else
            {
                int randomNumber = rand.Next(MaxRangomNubmer) + 1;
                if (WinningValues.Contains(randomNumber))
                {
                    int profit = bet * (1 + Multiplicator * randomNumber % 17);
                    balance += profit;
                    Console.WriteLine($"Выигрыш ставки: {profit}");
                }
                else
                {
                    balance -= bet;
                    Console.WriteLine("Проигрыш ставки.");
                }
            }
        }

        Console.WriteLine("Деньги на счёте истрачены!");
    }
}
