namespace Casino;

internal class Program
{
    public static void Main()
    {
        var rand = new Random();
        decimal balance = 10000;
        const int multiplicator = 10;
        
        while (balance > 0)
        {
            Console.WriteLine("\nБаланс: " + balance);
            Console.Write("Введите ставку: ");
            bool betParseResult = int.TryParse(Console.ReadLine(), out var bet);
            if (betParseResult is false)
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
                int randomNumber = rand.Next(20) + 1;
                if (randomNumber is 18 or 19 or 20)
                {
                    var profit = bet * (1 + multiplicator * randomNumber % 17);
                    balance += profit;
                    Console.WriteLine("Выигрыш ставки: +" + profit);
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
