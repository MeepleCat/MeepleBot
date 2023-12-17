using DSharpPlus;
using DSharpPlus.SlashCommands;
using MeepleBot.commands;
using MeepleBot.database;
using Microsoft.Extensions.DependencyInjection;
namespace MeepleBot;

static class MeepleBot
{
    private static async Task Main()
    {
        var services = new ServiceCollection();
        ConfigureServices(services);
        var serviceProvider = services.BuildServiceProvider();

        DiscordClient client = new(new DiscordConfiguration()
        {
            Token = await GetToken(),
            TokenType = TokenType.Bot,
            Intents = DiscordIntents.All,
        });

        try
        {
            await client.ConnectAsync();
        }
        catch (DSharpPlus.Exceptions.UnauthorizedException)
        {
            Logging.Logger.LogCritical(Logs.Discord, "Invalid token supplied, cannot login");
            return;
        }

        Logging.Logger.LogInfo(Logs.Discord, $"Logged in as {client.CurrentUser.Username}");
        await RegisterCommands(client, serviceProvider);
        Logging.Logger.LogInfo(Logs.Discord, "Slash commands registered");
        await Task.Delay(-1); // Keep the bot alive forever
    }

    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient<RealmDatabaseService>();
        // Register other services as needed
    }

    private static Task<String> GetToken()
    {
        return Task.Run(() =>
        {
            try
            {
                return File.ReadAllText("token.txt");
            }
            catch (FileNotFoundException)
            {
                Logging.Logger.LogCritical(Logs.Token, "token.txt was not found, exiting");
                Environment.Exit(1);
            }

            return "";
        });
    }

    private static Task RegisterCommands(DiscordClient clientContext, IServiceProvider serviceProvider)
    {
        var slash = clientContext.UseSlashCommands(new SlashCommandsConfiguration
        {
            Services = serviceProvider
        });

        slash.RegisterCommands<ApplicationCommand>();
        slash.RegisterCommands<QueueCommand>();
        slash.RegisterCommands<NotifyCommand>();
        slash.RegisterCommands<BenchmarkCommand>();
        slash.RegisterCommands<UsernameCommand>();
        // Register other commands as needed
        return Task.CompletedTask;
    }
}