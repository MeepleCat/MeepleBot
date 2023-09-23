import {Guild} from "discord.js";
import {addUser} from "../helpers/addUser";

export const guildCreate = async (guild:Guild) => {
    const members = await guild.members.fetch();
    const promises = members.map(async (member) => {
        await addUser(member)
    });
    await Promise.all(promises);
}