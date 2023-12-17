using Realms;

namespace MeepleBot.objects;

// This has no real use other than the "benchmark" command
public class UserObject : RealmObject
{
    [MapTo("discordid")] 
    public string? DiscordId { get; set; }
    [MapTo("username")]  
    public string? Username { get; set; }
}