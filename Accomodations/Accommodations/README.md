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

********************
# Фиксы бизнес логики:
    1. вы
    2. 2
    3. 3
    4.
