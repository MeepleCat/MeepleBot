import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";

export const claimed_numbers = async (interaction, sheet) => {
    try {
        await interaction.deferReply();

        let users = parseInt(await number_of_users(sheet));
        let numbers = (await get_cells(sheet, `Sheet1!D2:D${users+1}`)).split(",");
        let discord_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(',');

        const parsed_numbers = numbers.map((number, index) => {
            if (!isNaN(parseInt(number[0]))) {
                return `\n${number} claimed by <@${discord_ids[index].replace(/\D/g, '')}>`;
            }
            return null;
        }).filter(item => item !== null)

        await interaction.followUp(`The currently claimed numbers are:${parsed_numbers.sort()}`);
    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`)
        console.log(`Error: ${err}`)
    }
}