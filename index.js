import {Client, GatewayIntentBits} from "discord.js";
import { publishCommands } from "./commands/publishCommands.js";
import { configDotenv } from "dotenv";
import { commands } from "./commands/commandStructure.js";
import { google } from "googleapis";
import credentials from "./Google_Account.json" assert {type: 'json'}
import { ping } from "./commands/miscellaneous/ping.js";
import { bot_help } from "./commands/miscellaneous/bot_help.js";
import { determine_sheet } from "./google_sheets/determine_sheet.js";
import { whitelist } from "./commands/whitelisting/whitelist.js";
import { change_username } from "./commands/whitelisting/change_username.js";
import { notify } from "./commands/whitelisting/notify.js";
import { express_rage } from "./commands/miscellaneous/express_rage.js";
import { diagnostics } from "./commands/miscellaneous/diagnostics.js";
import { ip_help } from "./commands/miscellaneous/ip_help.js";
import { wave_function_collapse } from "./commands/miscellaneous/wave_function_collapse/wave_function_collapse.js";

wave_function_collapse();

configDotenv();

const conquistadors_sheet = "12v9rcF2kyaADv3E5aIxCrKY84w7qCOs07EANSWWfjqA";
const testing_sheet = "15jiM_EesRVD0tespvZjnRNQ7a7-9qJ3ZbPtNkpOm_Ho";
const lil_universe_sheet = "1X2Ipg8CvCg5yeAIrdwGcWPV8hc6H72IadP0jmFbw99k";
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const token = process.env.token_testing;

import express from "express";
const app = express();

app.get('/', (req, res) => {
  res.send('Hello. I am alive!');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000/');
});




export const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    scopes
);

auth.authorize().catch((err) => {
    console.log(`Authentication failed: ${err}`)
})

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
})
 
const main = async () => {
    await client.login(token);
    await publishCommands(commands, token, client.user.id);
}

client.on("ready", (event) => {
    console.log(`${event.user.tag} is ready.`)
})

let commandCount = 0;
let aliveTime = Date.now() / 1000

client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand || interaction.guild === null) {
            interaction.reply("You cannot run these commands in DMs.")
            return;
        }

        console.log("A new command just ran.");
        console.log(`           Command: /${interaction.commandName}`);
        console.log(`           Author: ${interaction.user.tag}`)
        switch (interaction.commandName) {
            case "ping": {
                await ping(interaction)
                commandCount += 1
                break
            }
            case "bot_help": {
                await bot_help(interaction);
                commandCount += 1
                break
            }
            case "whitelist": {
                await whitelist(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
                commandCount += 1
                break
            }
            case "change_username": {
                await change_username(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
                commandCount += 1
                break
            }
            case "notify": {
                await notify(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
                commandCount += 1
                break
            }
            case "express_rage": {
                await express_rage(interaction)
                commandCount += 1
                break
            }
            case "diagnostics": {
                await diagnostics(interaction, commandCount, aliveTime)
                commandCount += 1
                break
            }
            case "ip_help": {
                await ip_help(interaction)
                commandCount += 1
                break
            }
        }
})


main();
