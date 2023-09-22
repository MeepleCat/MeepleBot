export const guildCreate = async (guild) => {
    const members = await guild.members.fetch();
    members.forEach(async member => {
        const userExists = await (await fetch(`http://localhost:3001/user/${member.user.id}/exists`)).json()
        if(!userExists.exists) {
            await fetch(`http://localhost:3001/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: member.user.username,
                    discordId: member.user.id
                })
            })
        }
        return;
    });

}