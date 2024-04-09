# Фиксы ввода:

1. Невалидный ввод дат при создании брони и её поиске по категориям

   Можно использовать `DateTime.TryParse`
    ```csharp
    if (!DateTime.TryParse(parts[3], out DateTime bookingStartDate))
    {
        Console.WriteLine("Invalid booking start date.");
        return;
    }
    
    if (!DateTime.TryParse(parts[4], out DateTime bookingEndDate))
    {
        Console.WriteLine("Invalid booking end date.");
        return;
    }
    ```

2. Невалидный ввод валюты

   Можно исользовать `Enum.TryParse`
    ```csharp
    if (!Enum.TryParse(parts[5], true, out CurrencyDto currency))
    {
        Console.WriteLine("Invalid currency.");
        return;
    }
    ```

********************

# Фиксы бизнес логики:

1. Ошибка с отменой команды бронирования

   BookingService: метод Book

   У нас нет проверки, если пользователь создаст бронь, в диапазоне которой
   будут ещё и дни из прошлого. Добавим проверку:

    ```csharp 
    if (DateTime.Now <= startDate)
    {
        throw new ArgumentException("Can`t book earlier than the current time");
    }
    ```

2. Фикс с подсчётом штрафа

   Вычиталась текущая (ранняя) дата из поздней (начальной забронированной) датой.
   Теперь вычитание будет > 0.

   ```csharp
    public decimal CalculateCancellationPenaltyAmount(Booking booking)
    {
        int daysBeforeArrival = (booking.StartDate - DateTime.Now).Days;

        return 5000.0m / daysBeforeArrival;
    }
   ```

3. Фикс с отбражением категории комнаты

   Переопределил ToString для коректного отображения в консоли
   ```csharp
   public class RoomCategory
   {
       public string Name { get; init; }
       public decimal BaseRate { get; init; }
       public int AvailableRooms { get; set; }
   
       public override string ToString()
       {
           return Name;
       }
   }
   ```

********************

# Дополнительные фиксы в кодой базе:

1. BookingDto: 8

   Добавил required к полю категории, так как можно забыть установить значение
   при инициализации
   ```csharp
    public class BookingDto
    {
        public int UserId { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public required string Category { get; init; }
        public CurrencyDto Currency { get; init; }
    }
   ```

2. Поменял `s_commandIndex` на `_commandIndex` в соответствии с
   соглашениями о кодировании


********************

# Дополнительные фиксы в бизнес логике:

1. BookingService: метод CalculateCancellationPenaltyAmount

   Убрал проверку, при которой нельзя отменить бронь уже во время заезда,
   так как мы её уже проверяем в методе отмены бронирования, после которого 
   уже вызываем подсчёт штрафа. Речь идёт об этом условии:

    ```csharp 
    if (DateTime.Now <= startDate)
    {
        throw new ArgumentException("Can`t book earlier than the current time");
    }
    ```

