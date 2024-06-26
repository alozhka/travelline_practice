using Accommodations.Commands;
using Accommodations.Dto;

namespace Accommodations;

public static class AccommodationsProcessor
{
    private static BookingService _bookingService = new();
    private static Dictionary<int, ICommand> _executedCommands = new();
    private static int _commandIndex = 0;

    public static void Run()
    {
        Console.WriteLine("Booking Command Line Interface");
        Console.WriteLine("Commands:");
        Console.WriteLine("'book <UserId> <Category> <StartDate> <EndDate> <Currency>' - to book a room");
        Console.WriteLine("'cancel <BookingId>' - to cancel a booking");
        Console.WriteLine("'undo' - to undo the last command");
        Console.WriteLine("'find <BookingId>' - to find a booking by ID");
        Console.WriteLine("'search <StartDate> <EndDate> <CategoryName>' - to search bookings");
        Console.WriteLine("'exit' - to exit the application");

        string input;
        while ((input = Console.ReadLine()) != "exit")
        {
            try
            {
                ProcessCommand(input);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }

    private static void ProcessCommand(string input)
    {
        string[] parts = input.Split(' ');
        string commandName = parts[0];

        switch (commandName)
        {
            case "book":
                if (parts.Length != 6)
                {
                    Console.WriteLine("Invalid number of arguments for booking.");
                    return;
                }

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

                if (!Enum.TryParse(parts[5], true, out CurrencyDto currency))
                {
                    Console.WriteLine("Invalid currency.");
                    return;
                }

                BookingDto bookingDto = new(int.Parse(parts[1]), parts[2], bookingStartDate, bookingEndDate, currency);

                BookCommand bookCommand = new(_bookingService, bookingDto);
                bookCommand.Execute();
                _executedCommands.Add(++_commandIndex, bookCommand);
                Console.WriteLine("Booking command run is successful.");
                break;

            case "cancel":
                if (parts.Length != 2)
                {
                    Console.WriteLine("Invalid number of arguments for canceling.");
                    return;
                }

                if (!Guid.TryParse(parts[1], out Guid bookingId))
                {
                    Console.WriteLine("Invalid booking identifier.");
                    return;
                }
                CancelBookingCommand cancelCommand = new(_bookingService, bookingId);
                cancelCommand.Execute();
                _executedCommands.Add(++_commandIndex, cancelCommand);
                Console.WriteLine("Cancellation command run is successful.");
                break;

            case "undo":
                if (_commandIndex < 1)
                {
                    Console.WriteLine("There are no commands left to undo");
                    return;
                }

                _executedCommands[_commandIndex].Undo();
                _executedCommands.Remove(_commandIndex);
                _commandIndex--;
                Console.WriteLine("Last command undone.");
                break;
            
            case "find":
                if (parts.Length != 2)
                {
                    Console.WriteLine("Invalid arguments for 'find'. Expected format: 'find <BookingId>'");
                    return;
                }

                Guid id = Guid.Parse(parts[1]);
                FindBookingByIdCommand findCommand = new(_bookingService, id);
                findCommand.Execute();
                break;

            case "search":
                if (parts.Length != 4)
                {
                    Console.WriteLine(
                        "Invalid arguments for 'search'. Expected format: 'search <StartDate> <EndDate> <CategoryName>'");
                    return;
                }

                if (!DateTime.TryParse(parts[1], out DateTime searchStartDate))
                {
                    Console.WriteLine("Invalid booking start date.");
                    return;
                }

                if (!DateTime.TryParse(parts[2], out DateTime searchEndDate))
                {
                    Console.WriteLine("Invalid booking end date.");
                    return;
                }

                string categoryName = parts[3];
                SearchBookingsCommand searchCommand =
                    new(_bookingService, searchStartDate, searchEndDate, categoryName);
                searchCommand.Execute();
                break;

            default:
                Console.WriteLine("Unknown command.");
                break;
        }
    }
}
