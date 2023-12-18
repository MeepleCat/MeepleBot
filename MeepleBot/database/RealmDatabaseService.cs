using DSharpPlus.Entities;
using MeepleBot.objects;
using Realms;
using Realms.Sync;

namespace MeepleBot.database;

// Could probably divide this into subclasses? for example, one dedicated to working with users and another dedicated to working with applications
public class RealmDatabaseService
{
    private readonly Realm _realm;

    public RealmDatabaseService()
    {
        var config = new RealmConfiguration(Path.Join(Environment.CurrentDirectory, "meeplebot.realm"))
        {
            SchemaVersion = 1,
        };
        _realm = Realm.GetInstance(config);
    }
    public Task CreateApplication(string id, string game, string username)
    {
        DateTimeOffset time = new(DateTime.UtcNow);
        string unixTime = time.ToUnixTimeMilliseconds().ToString();
        return _realm.WriteAsync(() =>
        {
            _realm.Add(new ApplicationObject()
            {
                Time = unixTime,
                DiscordId = id,
                Game = game,
                Username = username,
            });
        });
    }

    public async Task<bool> ApplicationExists(string id)
    {
        return _realm.All<ApplicationObject>().Any(application => application.DiscordId == id);
    }

    public async Task<ApplicationObject?> GetUserApplication(string id)
    {
        var application = _realm.All<ApplicationObject>()
            .FirstOrDefault(application => application.DiscordId == id && application.Accepted == false);
        return application;
    }
    public async Task<IQueryable<ApplicationObject>> GetApplications(string game)
    {
        var application = _realm.All<ApplicationObject>().Where(application => application.Game == game && application.Accepted == false);
        return application;
    }
    public async Task AcceptUser(ApplicationObject userApplication)
    {
        using var transaction = await _realm.BeginWriteAsync();
        userApplication.Accepted = true;
        await transaction.CommitAsync();
    }

    public async Task AddUsers(IList<UserObject> users)
    {
        await _realm.WriteAsync(() =>
        {
            foreach (var user in users)
            {
                _realm.Add(user);
            }
        });
        _realm.Dispose();
    }

    public async Task ChangeUsername(ApplicationObject userApplication, string newUsername)
    {
        using var transaction = await _realm.BeginWriteAsync();
        userApplication.Accepted = false;
        userApplication.Username = newUsername;
        await transaction.CommitAsync();
    }
}