import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { set_cells } from "../../google_sheets/set_cells.js";

export const claim_number = async (interaction, sheet) => {
    try {
        await interaction.deferReply();

        if(interaction.options.getInteger("shuttle") === null || interaction.options.getInteger("thruster") === null) {
            await interaction.followUp("One of the parameters you entered is invalid, please fix it and try again.");
            return 0;
        }

        let users = parseInt(await number_of_users(sheet));
        let user_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");
        let numbers = (await get_cells(sheet, `Sheet1!D2:D${users+1}`)).split(",");
        const number_to_claim = `${interaction.options.getInteger("shuttle")}-${interaction.options.getInteger("thruster")}`;

        let user_row = -1;

        for(let i = 0; i < parseInt(users); i++) {
            if(user_ids[i] === "#"+interaction.user.id) {
                user_row = i + 2
            }
        }

        let number_found = false;

        for(let i = 0; i < users; i++) {
            if (numbers[i] === number_to_claim) {
                number_found = true;
            }
        }

        if (number_to_claim === "0-0") {
            await interaction.followUp("Don't claim 0-0, come on...")
            return
        }

        if(number_found) {
            await interaction.followUp("The number you selected has already been claimed, please select a new number.");
        }
        else {
            await set_cells(sheet, `D${user_row}`, [[number_to_claim]]);
            await interaction.followUp(`You have successfully claimed the number ${number_to_claim}.`);
        }
    }
    catch(err) {
        interaction.channel.send(`Fatal error. Please let the developers of the bot know.\n${err}`)
        console.log(`Error: ${err}`)
    }
}