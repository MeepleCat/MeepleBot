import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { set_cells } from "../../google_sheets/set_cells.js";

export const change_username = async (interaction, sheet) => {
    await interaction.deferReply();
    
    let users = await number_of_users(sheet);
    let user_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");
 
    console.log(`-----author_id\n----------${"#"+interaction.user.id}`);
    console.log(`-----user_ids\n----------${user_ids}`);

    let user_row = -1;

    for(var i = 0; i < parseInt(users); i++) {
        console.log(`user_id: ${user_ids[i]}, author_id: ${interaction.user.id}`);
        
        console.log(user_ids[i] == "#"+interaction.user.id);
        if(user_ids[i] === "#"+interaction.user.id) {
            user_row = i + 2
        };
    };

    if(user_row !== -1) {
        set_cells(sheet, `B${user_row}`, [[interaction.options.getString("new_username")]]);
        await interaction.editReply("Your username has been updated successfully.");
        return;
    }
    else {
        await interaction.editReply("You must be whitelisted in order to change your username.");
    };
};
