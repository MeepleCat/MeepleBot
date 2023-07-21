import { REST, Routes } from "discord.js";

export const publishCommands = async (commands, token, guild, client) => {
    const rest = new REST({version: '10' }).setToken(token)
    await rest.put(Routes.applicationGuildCommands(client,guild), {
        body: commands,
    }).then(() => console.log("Commands updated"))
}