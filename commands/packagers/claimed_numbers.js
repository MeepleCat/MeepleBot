import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";

export const claimed_numbers = async (interaction, sheet) => {
    try {
        await interaction.deferReply();

        let users = parseInt(await number_of_users(sheet));
        let numbers = (await get_cells(sheet, `Sheet1!D2:D${users+1}`)).split(",");
        let usernames = (await get_cells(sheet, `Sheet1!A2:A${users+1}`)).split(',');

        let parsed_numbers = []

        for(let i = 0; i < users; i++) {
            if(!isNaN(parseInt(numbers[i][0]))) {
                parsed_numbers.push(`\n${numbers[i]} claimed by ${usernames[i]}`);
            }
        }

        await interaction.followUp(`The currently claimed numbers are:${parsed_numbers.sort()}`);
    }
    catch(err) {
        interaction.channel.send(`Fatal error. Please let the developers of the bot know.\n${err}`)
        console.log(`Error: ${err}`)
    }
}