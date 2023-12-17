using Realms;
namespace MeepleBot.objects;

public class ApplicationObject : RealmObject
{
    [MapTo("time")]
    public required string Time { get; set; }
    [MapTo("discordid")]
    public required string DiscordId { get; set; }
    [MapTo("game")]
    public required string Game { get; set; }
    [MapTo("username")]
    public required string Username { get; set; }
    [MapTo("accepted")] 
    public bool Accepted { get; set; } = false; // Should be false by default
}