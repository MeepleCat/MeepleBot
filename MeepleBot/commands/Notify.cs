using DSharpPlus.Entities;
using DSharpPlus.SlashCommands;
using MeepleBot.database;

namespace MeepleBot.commands;

public class NotifyCommand : ApplicationCommandModule
{
    private static RealmDatabaseService _databaseService;
    public NotifyCommand(RealmDatabaseService databaseService)
    {
        _databaseService = databaseService;
    }
    [SlashCommand("notify", "Notify a user")]
    public static async Task Notify(
        InteractionContext context,
        [Option("user", "The user you want to notify")]
        DiscordUser user1
    )
    {
        var hasRole = context.Member.Roles.Any(role => role.Name.Equals("bot"));
        if (!hasRole)
        {
            var failedEmbed = new DiscordEmbedBuilder()
                .WithTitle("Permissions")
                .WithDescription("You can't do this lol")
                .WithColor(DiscordColor.Red);
            await context.CreateResponseAsync(new DiscordInteractionResponseBuilder().AddEmbed(failedEmbed));
            return;
        }
        await context.DeferAsync(ephemeral: true);
        
        var userApplication = await _databaseService.GetUserApplication(user1.Id.ToString());

        if (userApplication != null && userApplication.Accepted == false)
        {
            await _databaseService.AcceptUser(userApplication);
        }
        else
        {
            var failedEmbed = new DiscordEmbedBuilder()
                .WithTitle("Notification")
                .WithDescription("User has not applied, or has already been accepted.")
                .WithColor(DiscordColor.Red);
            await context.FollowUpAsync(new DiscordFollowupMessageBuilder().AddEmbed(failedEmbed));
            return;
        }

        var successEmbed = new DiscordEmbedBuilder()
            .WithTitle("Notification")
            .WithDescription($"Notifying <@{userApplication.DiscordId}>")
            .WithColor(DiscordColor.Blurple);
        await context.FollowUpAsync(new DiscordFollowupMessageBuilder().AddEmbed(successEmbed));
        await context.Channel.SendMessageAsync(new DiscordMessageBuilder()
            .WithContent($"<@{user1.Id}>, you have been whitelisted.").WithAllowedMention(new UserMention(user1)));
        // The "WithAllowedMentions" is necessary since discord does not allow bots to mention users by default
        Logging.Logger.LogInfo(Logs.Command, $"{context.User.Username} ran the /notify command. \nParams: {user1}");
    }
}