using System.Text.RegularExpressions;
using Gladiators.Config;

namespace Gladiators.Service;

public class ValidationService
{
    public static bool IsValidName(string name)
    {
        return Regex.IsMatch(name, ParseRegexes.Name);
    }
}