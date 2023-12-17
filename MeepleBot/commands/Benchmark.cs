using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;
using MeepleBot.database;
using MeepleBot.objects;

namespace MeepleBot.commands;

// The whole point of this command is to measure how long it takes for the database transaction to finish, this does not include the extra delay of fetching the discord members through discord's API
public class BenchmarkCommand : ApplicationCommandModule
{
    private static RealmDatabaseService _databaseService;
    public BenchmarkCommand(RealmDatabaseService databaseService)
    {
        _databaseService = databaseService;
    }
    [SlashCommand("benchmark", "This command allows the developers to benchmark how fast the bot is")]
    public static async Task Benchmark(InteractionContext context)
    {
        await context.DeferAsync();
        
        var members = context.Guild.Members;

        var startTime = DateTimeOffset.UtcNow;

        var usersToAdd = members.Values
            .Select(member => new UserObject { DiscordId = member.Id.ToString(), Username = member.Username })
            .ToList();
        await _databaseService.AddUsers(usersToAdd);

        var endTime = DateTimeOffset.UtcNow;
        var elapsedMilliseconds = Math.Round((endTime - startTime).TotalMilliseconds);

        var successEmbed = new DiscordEmbedBuilder()
            .WithTitle("Benchmark")
            .WithDescription($"Added {members.Count} users to the database, took {elapsedMilliseconds} ms")
            .WithColor(DiscordColor.Blurple);
        await context.FollowUpAsync(new DiscordFollowupMessageBuilder()
            .AddEmbed(successEmbed));
        Logging.Logger.LogInfo(Logs.Command, $"{context.User.Username} ran the /benchmark command.");
    }
}