import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { new_row } from "../../google_sheets/new_row.js";

export const whitelist = async (interaction, sheet) => {
    try {
        await interaction.deferReply();

        if(interaction.options.getString("username") === null) {
            await interaction.followUp("One of the parameters you entered is invalid, please fix it and try again.");
            return 0;
        }

        let users = parseInt(await number_of_users(sheet));
        let user_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");

        if(user_ids.includes("#"+interaction.user.id)) {
            await interaction.followUp("You are already registered with the bot, there is no need to re-register." +
                " If you wish to change your registered username please use /change_username.");
        } else {
            const range = `A${users+2}:G${users+2}`;
            let values = [[
                interaction.user.username,
                interaction.options.getString("username"),
                "#"+interaction.user.id,
                "no",
                "no",
                0,
                new Date().toString()
            ]]
            await new_row(sheet, range, values);

            await interaction.followUp("You have been added to the queue to be whitelisted.");
        }
    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`)
        console.log(`Error: ${err}`)
    }
}
