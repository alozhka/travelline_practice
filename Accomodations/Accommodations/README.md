# Фиксы ввода:


1. Невалидный ввод дат

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
    }
    ```

3. Проверка на пустую историю команд


********************
# Фиксы работы команд:

1. 

********************
# Фиксы бизнес логики:
    1. вы
    2. 2
    3. 3
    4.

# Дополнительные фиксы ввода:

1. Добавил required к полю категории, так как при создании экземпляра
есть вероятность забытиь её указать, и тогда мы получим ещё одно исключение
при отображении (null reference)
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