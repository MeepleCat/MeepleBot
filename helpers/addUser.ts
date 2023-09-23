import {GuildMember} from "discord.js";

export const addUser = async (member:GuildMember)=> {
    const userExists = await (await fetch(`http://localhost:3001/user/${member.user.id}/exists`)).json();
    if(!userExists.exists) {
        return fetch(`http://localhost:3001/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: member.user.username,
                discordId: member.user.id
            })
        });
    }
}
