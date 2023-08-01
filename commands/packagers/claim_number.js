import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { set_cells } from "../../google_sheets/set_cells.js";

export const claim_number = async (interaction, sheet) => {
    try {
        await interaction.deferReply();

        const shuttle = interaction.options.getInteger("shuttle");
        const thruster = interaction.options.getInteger("thruster");

        if (shuttle === null || thruster === null) {
            await interaction.followUp("One of the parameters you entered is invalid, please fix it and try again.");
            return 0;
        }

        const number_to_claim = `${shuttle}-${thruster}`;

        if (number_to_claim === "0-0") {
            await interaction.followUp("Don't claim 0-0, come on...");
            return;
        }

        let users = parseInt(await number_of_users(sheet));


        let user_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");
        let numbers = (await get_cells(sheet, `Sheet1!D2:D${users+1}`)).split(",");
        let discord_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");
        const user_row = user_ids.findIndex(id => id === `#${interaction.user.id}`) + 2;

        if (numbers.includes(number_to_claim)) {
            const claimedIndex = numbers.findIndex(number => number === number_to_claim);
            const claimedById = discord_ids[claimedIndex];

            claimedById === interaction.user.username
                ? await interaction.followUp(`You've already claimed that number you doofus`)
                : await interaction.followUp(`The number ${number_to_claim} has already been claimed by <@${discord_ids[claimedIndex].replace(/\D/g, '')}>. Please select a new number.`);

        }
        else {
            await set_cells(sheet, `D${user_row}`, [[number_to_claim]]);
            await interaction.followUp(`You have successfully claimed the number ${number_to_claim}.`);
        }
    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`);
        console.log(`Error: ${err}`);
    }
}