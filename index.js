import { Client, GatewayIntentBits } from "discord.js";
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
import { claim_number } from "./commands/packagers/claim_number.js";
import { claimed_numbers } from "./commands/packagers/claimed_numbers.js";

configDotenv();

const conquistadors_sheet = "12v9rcF2kyaADv3E5aIxCrKY84w7qCOs07EANSWWfjqA";
const testing_sheet = "15jiM_EesRVD0tespvZjnRNQ7a7-9qJ3ZbPtNkpOm_Ho";
const lil_universe_sheet = "1X2Ipg8CvCg5yeAIrdwGcWPV8hc6H72IadP0jmFbw99k";
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const token = process.env.token;

import express from "express";
const app = express();

app.get('/', (req, res) => {
  res.send('Hello. I am alive!');
});

const server = app.listen(5000, () => {
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
    return
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
            whitelist(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
            break
        }
        case "change_username": {
            change_username(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
            break
        }
        case "notify": {
            notify(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
            break
        }
        case "claim_number": {
            claim_number(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
            break
        }
        case "claimed_numbers": {
            claimed_numbers(interaction, determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet));
            break
        }
        console.log("A new command was just run.");
        console.log(`Command: /${interaction.commandName}`);
        console.log(`Author: ${interaction.user.tag}`);
    }
})


main();
