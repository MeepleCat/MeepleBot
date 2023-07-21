import { number_of_users } from "../google_sheets/number_of_users.js";
import { get_cells } from "../google_sheets/get_cells.js";

export const test_get_column = async (interaction, sheet) => {
    await interaction.deferReply();
    const rows_to_search = await number_of_users(sheet);
    const column = await get_cells(sheet, "Sheet1!A1:I10");
    await interaction.editReply(column);
}