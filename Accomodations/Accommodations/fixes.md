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

   BookingService: метод Book : 31

   У нас нет проверки, если пользователь создаст бронь, в диапазоне которой
   будут ещё и дни из прошлого. Добавим проверку:

    ```csharp 
    if (startDate <= DateTime.Now)
    {
        throw new ArgumentException("Can`t book earlier than the current time");
    }
    ```

2. Фикс с подсчётом штрафа

   BookingService: 112

   Вычиталась текущая (ранняя) дата из поздней (начальной забронированной) датой.
   Теперь вычитание будет > 0.

   ```csharp
    int daysBeforeArrival = (booking.StartDate - DateTime.Now).Days;
   ```

3. Фикс с отображением категории комнаты

   RoomCategory: 16

   Переопределил ToString для корректного отображения в консоли
   ```csharp
   public override string ToString()
    {
        return Name;
    }
   ```
   
4. Фикс с конвертацией валют

   BookingService: 143

   Поправил вычисление скидки, ошибка была в вычислении процентов
   для скидки. CurrencyRate умножался не на всё значение, а только на скидку

   ```csharp
   decimal totalCost = cost * (1 - CalculateDiscount(userId)) * currencyRate
   ```

********************

# Дополнительные фиксы в кодовой базе:

1. Добавил по конструктору классу Booking, BookingDto, RoomCategory, 
   так как можно забыть указать какое-либо из полей при инициализации не через конструктор

2. Поменял `s_commandIndex` на `_commandIndex` в соответствии с
   соглашениями о кодировании


********************

# Дополнительные фиксы в бизнес логике:

1. BookingService: метод CalculateCancellationPenaltyAmount : 110

   Убрал проверку, при которой нельзя отменить бронь во время заезда и позже.
   Так как мы вызываем подсчёт штрафа в тандеме с методами,
   которые делают валидацию, то по сути будет выполняться двойная проверка.
   Я убрал из метода это условие:
    ```csharp 
    if (DateTime.Now <= startDate)
    {
        throw new ArgumentException("Can`t book earlier than the current time");
    }
    ```

2. BookingService: 107
   Сделал нестрогое сравнение, так как иначе мы бы теряли последний день во время запроса
   ```csharp
    public IEnumerable<Booking> SearchBookings(DateTime startDate, DateTime endDate, string categoryName)
    {
        IQueryable<Booking> query = _bookings.AsQueryable()
            .Where(b => b.StartDate >= startDate)
            .Where(b => b.EndDate <= endDate);

        if (!string.IsNullOrEmpty(categoryName))
        {
            query = query.Where(b => b.RoomCategory.Name == categoryName);
        }

        return query.ToList();
    }
   ```

   Ещё я сразу же применил сортировку,
