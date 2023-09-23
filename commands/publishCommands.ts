import { Client, REST, Routes } from "discord.js";

export const publishCommands = async (commands:Array<object>, token:string, client:Client) => {
    const rest = new REST({version: '10' }).setToken(token)
    await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
    }).then(() => console.log("Commands updated\n"))
}