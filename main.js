import { Client, GatewayIntentBits } from "discord.js";
import { configDotenv } from "dotenv";
import { publishCommands } from "./commands/publishCommands.js";
import { commands } from './commands/commandStructure.js'
import { add_users_to_db } from "./commands/add_users_to_db.js";
import { balance } from "./commands/balance.js";
import { sendMoney } from "./commands/sendmoney.js";
import { transactionHistory } from "./commands/transaction-history.js";
configDotenv();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ]
})

client.login(process.env.token)
client.on('ready', async (client)=>{
    console.log("Logged on as",client.user.username)
    
    publishCommands(commands, process.env.token, client.user.id);

})

client.on("interactionCreate", (interaction)=>{
    switch (interaction.commandName) {
        case "add_users_to_db": {
            add_users_to_db(interaction)
            break;
        }
        case "balance": {
            balance(interaction)
            break;
        }
        case "send-money": {
            sendMoney(interaction)
            break;
        }
        case "transaction-history": {
            transactionHistory(interaction)
            break;
        }
    }
})