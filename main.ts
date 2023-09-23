import {Client, Colors, EmbedBuilder, GatewayIntentBits, Interaction} from "discord.js";
import { configDotenv } from "dotenv";
import { publishCommands } from "./commands/publishCommands";
import { commands } from './commands/commandStructure'
import { add_users_to_db } from "./commands/add_users_to_db";
import { balance } from "./commands/balance";
import { sendMoney } from "./commands/sendmoney";
import { transactionHistory } from "./commands/transaction-history";
import { work } from "./commands/work";
import { guildMemberAdd } from "./events/guildMemberAdd";
import { guildCreate } from "./events/guildCreate";
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
    
    await publishCommands(commands, process.env.token as string, client);

})

client.on("interactionCreate", async (interaction:Interaction)=>{
    if (!interaction.isCommand()) return;
    if (!interaction.isChatInputCommand || interaction.guild === null) {
        const embed = new EmbedBuilder().setTitle('Error').setDescription("Sorry, but you can't run bot commands in DMs").setColor(Colors.Red)
        await interaction.reply({embeds:[embed]})
        return;
    }
    switch (interaction.commandName) {
        case "add_users_to_db": {
            await add_users_to_db(interaction)
            break;
        }
        case "balance": {
            await balance(interaction)
            break;
        }
        case "send-money": {
            await sendMoney(interaction)
            break;
        }
        case "transaction-history": {
            await transactionHistory(interaction)
            break;
        }
        case "work": {
            await work(interaction)
            break;
        }
    }
})
client.on("guildMemberAdd", async (member)=>{
    await guildMemberAdd(member);
})
client.on("guildCreate", async (guild)=>{
    await guildCreate(guild);
})