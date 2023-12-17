using DSharpPlus.Entities;
using MeepleBot.objects;
using Realms;
using Realms.Sync;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MeepleBot.database
{
    public class RealmDatabaseService
    {
        private RealmConfiguration GetRealmConfiguration()
        {
            return new RealmConfiguration(Path.Join(Environment.CurrentDirectory, "meeplebot.realm"))
            {
                SchemaVersion = 1
            };
        }

        public async Task CreateApplication(string id, string game, string username)
        {
            var time = DateTimeOffset.UtcNow;
            string unixTime = time.ToUnixTimeMilliseconds().ToString();
            var config = GetRealmConfiguration();

            using var realm = await Realm.GetInstanceAsync(config);
            await realm.WriteAsync(() =>
            {
                realm.Add(new ApplicationObject()
                {
                    Time = unixTime,
                    DiscordId = id,
                    Game = game,
                    Username = username
                });
            });
        }

        public async Task<bool> ApplicationExists(string id)
        {
            var config = GetRealmConfiguration();
            using var realm = await Realm.GetInstanceAsync(config);
            return realm.All<ApplicationObject>().Any(application => application.DiscordId == id);
        }

        public async Task<ApplicationObject?> GetUserApplication(string id)
        {
            var config = GetRealmConfiguration();
            using var realm = await Realm.GetInstanceAsync(config);
            var application = realm.All<ApplicationObject>().FirstOrDefault(app => app.DiscordId == id);
            return application;
        }

        public async Task<IQueryable<ApplicationObject>> GetApplications(string game)
        {
            var config = GetRealmConfiguration();
            using var realm = await Realm.GetInstanceAsync(config);
            var applications = realm.All<ApplicationObject>().Where(app => app.Game == game && app.Accepted == false);
            return applications;
        }

        public async Task AcceptUser(ApplicationObject userApplication)
        {
            var config = GetRealmConfiguration();
            using var realm = await Realm.GetInstanceAsync(config);
            using var transaction = await realm.BeginWriteAsync();
            var realmApp = realm.Find<ApplicationObject>(userApplication.DiscordId);
            if (realmApp != null)
            {
                realmApp.Accepted = true;
                await transaction.CommitAsync();
            }
        }

        public async Task AddUsers(IList<UserObject> users)
        {
            var config = GetRealmConfiguration();
            using var realm = await Realm.GetInstanceAsync(config);
            await realm.WriteAsync(() =>
            {
                foreach (var user in users)
                {
                    realm.Add(user);
                }
            });
        }

        public async Task ChangeUsername(ApplicationObject userApplication, string newUsername)
        {
            var config = GetRealmConfiguration();
            using var realm = await Realm.GetInstanceAsync(config);
            using var transaction = await realm.BeginWriteAsync();
            var realmApp = realm.Find<ApplicationObject>(userApplication.DiscordId);
            if (realmApp != null)
            {
                realmApp.Username = newUsername;
                realmApp.Accepted = false;
                await transaction.CommitAsync();
            }
        }
    }
}
