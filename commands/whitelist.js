import { number_of_users } from "../google_sheets/number_of_users.js";
import { get_cells } from "../google_sheets/get_cells.js";

export const whitelist = async (interaction, sheet) => {
    await interaction.deferReply();
    let users;
    let user_ids;
    let user_in_sheet;
    users = await number_of_users(sheet);
    user_ids = await get_cells(sheet, `Sheet1!C2:C${users+1}`);
    console.log(`-----user_ids\n----------${user_ids}`);
    
    user_in_sheet = false;
    for(var i = 0; i < parseInt(number_of_users)+1; i++) {
        if(users[i].replace(/\D/g, '') == interaction.author.id) {
            user_in_sheet = true;
        };
        console.log(users[i].replace(/\D/g, ''));
        console.log(interaction.author.id);
    };

    if(user_in_sheet) {
        await interaction.editReply("You are already registered with the bot, there is no need to re-register." +
        " If you wish to change your registered uesrname please use /change_username.");
    }
    else {
        await interaction.editReply("test2");
    }
}