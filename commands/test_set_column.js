import { number_of_users } from "../google_sheets/number_of_users.js";
import { set_cells } from "../google_sheets/set_cells.js";

export const test_set_column = async (interaction, sheet) => {
    await interaction.deferReply();
    const rows_to_search = await number_of_users(sheet);
    const new_values = [
         [1, 2, 3],
         [4, 5, 6],
         [7, 8, 9]
    ]
    await set_cells(sheet, "Sheet1!G8:I10", new_values);
	await interaction.followUp("Done!");
}