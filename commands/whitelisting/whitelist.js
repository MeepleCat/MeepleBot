import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { set_cells } from "../../google_sheets/set_cells.js";

export const whitelist = async (interaction, sheet) => {
    await interaction.deferReply();
    let users;
    let user_ids;
    let user_in_sheet;
    users = await number_of_users(sheet);
    user_ids = (await get_cells(sheet, `Sheet1!C2:C${users+1}`)).split(",");
    
    console.log(`-----author_id\n----------${"#"+interaction.user.id}`);
    console.log(`-----user_ids\n----------${user_ids}`);
    
    user_in_sheet = false;

    for(var i = 0; i < parseInt(users); i++) {
        console.log(`user_id: ${user_ids[i]}, author_id: ${interaction.user.id}`);
        
        console.log(user_ids[i] == "#"+interaction.user.id);
        if(user_ids[i] == "#"+interaction.user.id) {
            user_in_sheet = true;
        };
    };

    if(user_in_sheet) {
        await interaction.editReply("You are already registered with the bot, there is no need to re-register." +
        " If you wish to change your registered uesrname please use /change_username.");
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
        values.push("0");
        values.push(new Date().toString());

        new_values.push(values);

        await set_cells(sheet, range, new_values);

        await interaction.editReply("You have been added to the queue to be whitelisted.");
    }
}
