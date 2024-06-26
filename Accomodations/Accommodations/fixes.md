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

1. AccommodationProcessor : 85

   Ошибка при вводе данных. Поставил проверку для Guid
   ```csharp
   if (!Guid.TryParse(parts[1], out Guid bookingId))
       {
           Console.WriteLine("Invalid booking identifier.");
           return;
       }
   ```

2. Добавил по конструктору классу Booking, BookingDto, RoomCategory,
   так как можно забыть указать какое-либо из полей при инициализации не через конструктор

3. Поменял `s_commandIndex` на `_commandIndex` в соответствии с
   соглашениями о кодировании

4. BookingService: 57

   При создании указывается nullable переменная, хотя она таковой при инициализации быть не может
   ```csharp
   Booking? booking = new(Guid.NewGuid(), userId, startDate, endDate, selectedCategory, currency, totalCost);
   ```

   Я убрал ? из кода.

5. BookingService : 96

   Сделал поиск сразу по 2 критериям, чтобы не использовать только один запрос, а не 2 по очереди.
   ```csharp
   IQueryable<Booking> query = _bookings
               .AsQueryable()
               .Where(b => b.StartDate >= startDate && b.EndDate <= endDate);
   ```

6. SearchBookingCommand : 14

   Убрал nullable из типа бронирований, так как мы получим пустое перечисление, если не
   найдём ни одно бронирование. А если найдём, то оно всегда будет валидным и без null
   ```csharp
   IEnumerable<Booking?> bookings = bookingService.SearchBookings(startDate, endDate, categoryName);
   ```
   Здесь убрал ? и в IBooking Service (10 строка) тоже поправил

   ```csharp
   IEnumerable<Booking> SearchBookings(DateTime startDate, DateTime endDate, string categoryName);
   ```

7. IBookingService : 7

   Аналогично убрал nullable, так как метод всегда возвращает не null

   ```csharp
   Booking Book(int userId, string categoryName, DateTime startDate, DateTime endDate, Currency currency);
   ```

********************

# Дополнительные фиксы в бизнес логике:

1. BookingService : 119

   Мы принимали usd/rub и cny/rub как rub/usd и rub/cny с теми же значениями.
   Получалось, что рубль мог стоить от 1 доллара до 101. Делю на 1, чтобы подвести к курсу rub/usd(cny)
   ```csharp
   Random rand = new();
   decimal currencyRate = 1m;
   currencyRate *= currency switch
   {
      Currency.Usd => (decimal) (1 / (92 + rand.NextDouble() * 5)), // 92 +- 5
      Currency.Cny => (decimal) (1 / (12 + rand.NextDouble() * 2)), // 12 +- 2
      Currency.Rub => 1m,
      _ => throw new ArgumentOutOfRangeException(nameof(currency), currency, null)
   };
   ```
2. BookingService : 27

   Неправильно считался штраф, так как 5000руб не были привязаны к валюте.
   Я вызываю метод для подсчёта стоимости для конкретной валюты, которая уже прокидывается
   через класс Booking.

   ```csharp
   public decimal CalculateCancellationPenaltyAmount(Booking booking)
       {
           int daysBeforeArrival = (booking.StartDate - DateTime.Now).Days;
   
           return 5000.0m * GetCurrencyRate(booking.Currency) / daysBeforeArrival;
       }
   ```

3. BookingService : 107

   Сделал нестрогое сравнение для EndDate,
   иначе мы бы теряли последний день во время запроса
   ```csharp
    IQueryable<Booking> query = _bookings
            .AsQueryable()
            .Where(b => b.StartDate >= startDate && b.EndDate <= endDate);
   ```

4. BookingService : 80
   
   Мы добавляем в отель категорию из списка и потом ищем эту жу категорию в этом же списке.
   Получается, что категория отеля всегда будет найдена.
   ```csharp
        // тут мы выбираем из категорий при создании брони (метод Book)
        RoomCategory? selectedCategory = _categories.FirstOrDefault(c => c.Name == categoryName);
        // тут мы находим категорию из списка при раблоте с бронью (метод CancelBooking)
        RoomCategory category = _categories.First(c => c.Name == booking.RoomCategory.Name);
   ```

5. AccommodationProcessor : 100

   Не было `return` после проверки индекса. Получалось так, что ошибка выводилась,
   но при этом запускалась отмена несуществующей команды с индексом 0.
   
   ```csharp
   case "undo":
       if (_commandIndex < 1)
       {
           Console.WriteLine("There are no commands left to undo");
           return;
       }
   ```

# Работа с поиском

При тестировании я вернул свой один запрос на два, как было до этого.

```csharp
IQueryable<Booking> query = _bookings.AsQueryable();

query = query.Where(b => b.StartDate >= startDate);

query = query.Where(b => b.EndDate <= endDate);
```

Начальные данные:

```
book 1 Standard 09/01/2024 09/08/2024 rub
book 2 Deluxe 5/30/2024 6/4/2024 cny
book 3 Standard 9/07/2024 11/04/2024 cny
book 4 Deluxe 06/17/2024 1/1/2025 usd
book 5 Standard 04/15/2024 04/27/2024 rub
```

Данные с запроса:

```
search 5/22/2024 10/08/2024 Standard
```

Значения в начале:

![Все значения](../assets/initial.png)

Поиск по дате въезда:

![Поиск по дате въезда](../assets/first_query.png)

Поиск по дате выезда:

![Поиск по дате выезда](../assets/second_query.png)

Поиск по категории:

![Поиск по категории](../assets/third_query.png)

Результат

```
Found 1 bookings for category 'Standard' between 5/22/2024 12:00:00 AM and 10/8/2024 12:00:00 AM:
- Booking ID: 4b8f444b-97bb-4e66-94d8-09b4a2bf21c1, User ID: 1
```