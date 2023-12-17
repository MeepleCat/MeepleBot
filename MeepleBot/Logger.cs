using NotEnoughLogs;
using NotEnoughLogs.Behaviour;

namespace MeepleBot;

internal enum Logs
{
    Token,
    Discord,
    Command
}

public static class Logging
{
    public static readonly Logger Logger;

    static Logging()
    {
        var configuration = new LoggerConfiguration
        {
            Behaviour = new DirectLoggingBehaviour(),
            MaxLevel = LogLevel.Info
        };
        Logger = new Logger(configuration);
    }
}