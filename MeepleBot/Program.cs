﻿using DSharpPlus;
using DSharpPlus.SlashCommands;
using MeepleBot.commands;
using MeepleBot.database;
using Microsoft.Extensions.DependencyInjection;

namespace MeepleBot;

// TODO: Convert all bot responses to embeds
static class MeepleBot
{
    private static async Task Main()
    {
        var services = new ServiceCollection();
        ConfigureServices(services);
        var serviceProvider = services.BuildServiceProvider();
        DiscordClient client = new(new DiscordConfiguration()
        {
            Token = (await GetToken()),
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
        }

        Logging.Logger.LogInfo(Logs.Discord, $"Logged in as {client.CurrentUser.Username}");
        await RegisterCommands(client, serviceProvider);
        Logging.Logger.LogInfo(Logs.Discord, "Slash commands registered");
        await Task.Delay(-1); // Keep the bot alive forever
    }
    private static void ConfigureServices(IServiceCollection services) // DI
    {
        services.AddSingleton<RealmDatabaseService>();
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
                Task.Delay(1000);
                Environment.Exit(1);
            }

            return "";
        });
    }

    private static Task RegisterCommands(DiscordClient clientContext, IServiceProvider services)
    {
        var slash = clientContext.UseSlashCommands(new SlashCommandsConfiguration
        {
            Services = services
        });
        slash.RegisterCommands<ApplicationCommand>();
        slash.RegisterCommands<QueueCommand>();
        slash.RegisterCommands<NotifyCommand>();
        slash.RegisterCommands<BenchmarkCommand>();
        return Task.CompletedTask;
    }
}