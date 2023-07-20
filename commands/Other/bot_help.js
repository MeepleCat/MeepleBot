const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot_help')
		.setDescription('Displays information about how to use the bot.'),
	async execute(interaction) {
		await interaction.reply("## List of commands (all commands start with the / prefix):\n### whitelist: adds your username to the queue.\n### change_username: changes the username recorded.\n### claim_number: allows you to claim a packager number to put on your rocket and thruster.\n### claimed_numbers: shows the claimed packager numbers.");
	},
};