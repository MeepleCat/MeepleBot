import { Client, GatewayIntentBits } from "discord.js";
import { publishCommands } from "./commands/publishCommands.js";
import { configDotenv } from "dotenv";
import { commands } from "./commands/commandStructure.js";
import { google } from "googleapis";
import credentials from "./Google_Account.json" assert {type: 'json'}
import { ping } from "./commands/ping.js";
import { bot_help } from "./commands/bot_help.js";
import { determine_sheet } from "./google_sheets/determine_sheet.js";
import { whitelist } from "./commands/whitelist.js";
import { test_get_column } from "./commands/test_get_column.js";
import { test_set_column } from "./commands/test_set_column.js";

configDotenv();

const conquistadors_sheet = "12v9rcF2kyaADv3E5aIxCrKY84w7qCOs07EANSWWfjqA";
const testing_sheet = "15jiM_EesRVD0tespvZjnRNQ7a7-9qJ3ZbPtNkpOm_Ho";
const lil_universe_sheet = "1X2Ipg8CvCg5yeAIrdwGcWPV8hc6H72IadP0jmFbw99k";
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

export const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    scopes
);

auth.authorize().catch((err) => {
    console.log(`Authentication failed: ${err}`)
    return
})

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
})
 
const main = async () => {
    await client.login(process.env.token)
    await publishCommands(commands, process.env.token, client.user.id)
}

client.on("ready", (event) => {
    console.log(`${event.user.tag} is ready.`)
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand) {
        return;
    }
    switch(interaction.commandName) {
        case "ping": {
            ping(interaction);
            break
        }
        case "bot_help": {
            bot_help(interaction);
            break
        }
        case "whitelist": {
            whitelist(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet))
            break
        }
        case "test_get_column": {
            test_get_column(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet))
            break
        }
        case "test_set_column": {
            test_set_column(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet))
            break
        }

    }
})


main();