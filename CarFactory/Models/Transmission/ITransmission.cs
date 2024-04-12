namespace CarFactory.Models.Transmission;

public interface ITransmission : IModel
{
    int GearsAmount { get; }
}