import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { set_cells } from "../../google_sheets/set_cells.js";

export const change_username = async (interaction, sheet) => {
    try {
        await interaction.deferReply();

        if(interaction.options.getString("new_username") === null) {
            await interaction.followUp("One of the parameters you entered is invalid, please fix it and try again.");
            return 0;
        }

        let users = await number_of_users(sheet);
        let user_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");

        let user_row = -1;

        for(let i = 0; i < parseInt(users); i++) {
            if(user_ids[i] === "#"+interaction.user.id) {
                user_row = i + 2
            }
        }
        const role = interaction.guild.roles.cache.find(r => r.name === 'Player');
        if (!role) {
            interaction.followUp("the 'Player' role was not found, could not remove it from you.")
            return;
        }
        if(user_row !== -1) {
            await set_cells(sheet, `B${user_row}`, [[interaction.options.getString("new_username")]]);
            await set_cells(sheet, `D${user_row}`, [["no"]])
            await set_cells(sheet, `E${user_row}`, [["no"]])
            const member = await interaction.guild.members.fetch(interaction.user.id);
            member.roles.remove(role);
            await interaction.followUp("Your username has been updated successfully. If you were already whitelisted, you will have be rewhitelisted.");
        }
        else {
            await interaction.followUp("You must be whitelisted in order to change your username.");
        }
    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`)
        console.log(`Error: ${err}`)
    }
};
