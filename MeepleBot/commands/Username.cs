using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;
using MeepleBot.database;

namespace MeepleBot.commands;

public class UsernameCommand : ApplicationCommandModule
{
    private readonly RealmDatabaseService _databaseService;

    public UsernameCommand(RealmDatabaseService databaseService)
    {
        _databaseService = databaseService;
    }
    
    [SlashCommand("change_username","Done goofed up? Change your username")]
    public async Task ChangeUsername(
    InteractionContext context,
    [Option("username","New username")]
    string newUsername
    )
    {
        await context.DeferAsync();
        var userApplication = await _databaseService.GetUserApplication(context.User.Id.ToString());
        if (userApplication != null)
        {
            await _databaseService.ChangeUsername(userApplication, newUsername);
        }
        else
        {
            var failedEmbed = new DiscordEmbedBuilder()
                .WithTitle("Username change")
                .WithDescription("You haven't applied so you can't change your username")
                .WithColor(DiscordColor.Red);
            await context.FollowUpAsync(new DiscordFollowupMessageBuilder().AddEmbed(failedEmbed));
            return;
        }

        var successEmbed = new DiscordEmbedBuilder()
            .WithTitle("Username change")
            .WithDescription($"Username successfully changed to \"{newUsername}\". You will have to get whitelisted again.")
            .WithColor(DiscordColor.Blurple);
        await context.FollowUpAsync(new DiscordFollowupMessageBuilder().AddEmbed(successEmbed));
    }
}