import {GuildMember} from "discord.js";
import {addUser} from "../helpers/addUser";

export const guildMemberAdd = async (member:GuildMember) => {
    await addUser(member)
}