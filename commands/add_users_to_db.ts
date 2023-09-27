import {CommandInteraction} from "discord.js";
import {addUser} from "../helpers/addUser";
export const add_users_to_db = async (interaction:CommandInteraction) => {
    if (process.env.admins && process.env.admins.includes(interaction.user.id)){
    await interaction.deferReply();
    const startTime = Date.now();
        const members = await interaction.guild.members.fetch();
        try {
        members.forEach(member => {
           addUser(member);
        });
    } catch (err) {
        console.error(`Failed to fetch members from guild: ${interaction.guild.id} | Error: ${err.message}`);
    }
    const endTime = Date.now()
    
    await interaction.editReply(`Added ${interaction.guild.memberCount} users to database. Took ${endTime-startTime} milliseconds.`)
    } else {
        await interaction.reply("You can't do this because you are not Meeple or Speedy, sorry lol")
    }
}