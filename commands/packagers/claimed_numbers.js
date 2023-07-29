import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";

export const claimed_numbers = async (interaction, sheet) => {
    await interaction.deferReply();

    let users = parseInt(await number_of_users(sheet));
    let numbers = (await get_cells(sheet, `Sheet1!D2:D${users+1}`)).split(",");
    
    let parsed_numbers = []

    for(var i = 0; i < users; i++) {
        if(!isNaN(parseInt(numbers[i][0]))) {
            parsed_numbers.push(`${numbers[i]}, `);
        }
    }

    await interaction.editReply(`The currently claimed numbers are: ${parsed_numbers.sort()}`);
}