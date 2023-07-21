const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token_testing } = require('./config.json');

const deployCommands = require("./deploy_commands");

const determine_sheet = require("./google_sheets/determine_sheet.js");

const client = new Client({ intents: [
	GatewayIntentBits.Guilds
]});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// AUTHORIZES WITH GOOGLE //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const { google } = require("googleapis");
const sheets = google.sheets("v4");

// Load the service account credentials (replace 'path/to/your/credentials.json' with your actual file path)
const credentials = require("./Google_Account.json");

// Define the scopes required for the Google Sheets API
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

// Authenticate with the Google Sheets API using the service account credentials
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

// Authorize the client and make API calls
auth.authorize((err) => {
  if (err) {
    console.error("Authentication failed:", err);
    return;
  }
  // You're now authenticated and can make API calls!
  // See examples below on how to use the API.
});

const conquistadors_sheet = "12v9rcF2kyaADv3E5aIxCrKY84w7qCOs07EANSWWfjqA";
const testing_sheet = "15jiM_EesRVD0tespvZjnRNQ7a7-9qJ3ZbPtNkpOm_Ho";
const lil_universe_sheet = "1X2Ipg8CvCg5yeAIrdwGcWPV8hc6H72IadP0jmFbw99k";

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SYNCS COMMANDS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}	
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// EXECUTES COMMANDS //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	console.log(`--------------------\nA new command was run:`);
	console.log(`-----Interaction:\n----------${interaction}`);
	console.log(`-----Guild\n----------${interaction.guild}`);
	console.log(`-----Channel\n----------${interaction.channel}`);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		//return;
	}

	try {
		const sheet = determine_sheet(interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet);
		await command.execute(interaction, sheet);
	} catch (error) {
		// console.error(error);
		try {
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		} catch (error) {
			return;
		}
	}
});

deployCommands();
client.login(token_testing);

module.exports = auth;