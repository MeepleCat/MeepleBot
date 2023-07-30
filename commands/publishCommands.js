import { REST, Routes } from "discord.js";

export const publishCommands = async (commands, token, client) => {
    const rest = new REST({version: '10' }).setToken(token)
    await rest.put(Routes.applicationCommands(client), {
        body: commands,
    }).then(() => console.log("Commands updated\n-------------------------------------------------------------------------------"))
}
