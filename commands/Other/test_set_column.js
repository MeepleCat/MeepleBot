const number_of_users = require("../../google_sheets/number_of_users.js");
const set_cells = require("../../google_sheets/set_cells.js");

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test_set_column')
		.setDescription('test_set_column'),
	async execute(interaction, sheet) {
        await interaction.deferReply();
        rows_to_search = await number_of_users(sheet);
        new_values = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
        await set_cells(sheet, "Sheet1!G8:I10", new_values);
		await interaction.editReply("Done!");
	},
};