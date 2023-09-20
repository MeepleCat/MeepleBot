import { Client, GatewayIntentBits } from "discord.js";
import { configDotenv } from "dotenv";
configDotenv();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ]
})

client.login(process.env.token)
client.on('ready',(e)=>{
    console.log("Logged on as",e.user.username)
})