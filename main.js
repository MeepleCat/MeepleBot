import { Client, Colors, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { configDotenv } from "dotenv";
import { publishCommands } from "./commands/publishCommands.js";
import { commands } from './commands/commandStructure.js'
import { add_users_to_db } from "./commands/add_users_to_db.js";
import { balance } from "./commands/balance.js";
import { sendMoney } from "./commands/sendmoney.js";
import { transactionHistory } from "./commands/transaction-history.js";
import { work } from "./commands/work.js";
import { guildMemberAdd } from "./events/guildMemberAdd.js";
import { guildCreate } from "./events/guildCreate.js";
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
    if (!interaction.isChatInputCommand || interaction.guild === null) {
        const embed = new EmbedBuilder().setTitle('Error').setDescription("Sorry, but you can't run bot commands in DMs").setColor(Colors.Red)
        interaction.reply({embeds:[embed]})
        return;
    }
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
        case "work": {
            work(interaction)
            break;
        }
    }
})
client.on("guildMemberAdd", (member)=>{
    guildMemberAdd(member);
})
client.on("guildCreate", async (guild)=>{
    guildCreate(guild);
})