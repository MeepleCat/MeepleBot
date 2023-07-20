const number_of_users = require("../../google_sheets/number_of_users.js");
const get_cells = require("../../google_sheets/get_cells.js");

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test_get_column')
		.setDescription('test_get_column'),
	async execute(interaction, sheet) {
        await interaction.deferReply();
        rows_to_search = await number_of_users(sheet);
        column = await get_cells(sheet, "Sheet1!A1:I10");
		await interaction.editReply(column);
	},
};