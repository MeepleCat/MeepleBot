import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { new_row } from "../../google_sheets/new_row.js";

export const whitelist = async (interaction, sheet) => {
    await interaction.deferReply();

    if(interaction.options.getString("username") === null) {
        await interaction.followUp("One of the parameters you entered is invalid, please fix it and try again.");
        return 0;
    }

    let users = parseInt(await number_of_users(sheet));
    let user_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");

    let user_in_sheet = false;

    for(var i = 0; i < parseInt(users); i++) {        
        if(user_ids[i] === "#"+interaction.user.id) {
            user_in_sheet = true;
        };
    };

    if(user_in_sheet) {
        await interaction.followUp("You are already registered with the bot, there is no need to re-register." +
        " If you wish to change your registered username please use /change_username.");
        return;
    }
    else {
        const range = `A${users+2}:H${users+2}`;
        let new_values = [];
        let values = []
        
        values.push(interaction.user.username);
        values.push(interaction.options.getString("username"));
        values.push("#"+interaction.user.id);
        values.push("N/A");
        values.push("no");
        values.push("no");
        values.push(0);
        values.push(new Date().toString());

        new_values.push(values);

        await new_row(sheet, range, new_values);

        await interaction.followUp("You have been added to the queue to be whitelisted.");
    }
}
