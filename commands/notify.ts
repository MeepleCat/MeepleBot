import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";

export const notify = async (interaction:CommandInteraction) => {
    await interaction.deferReply({ephemeral:true})
    try {
    if (process.env.admins && process.env.admins.includes(interaction.user.id)) { // Checks if the user's id that is running the command is inside the admins variable
        const users = interaction.options.data // This gets the User IDS that are specified in the options
        const userIdsString = users.map((option)=> {
            return `<@${option.value}>`
        }) // Constructs a string that has the user ids specified in the options
        users.map(async (option)=> {
            await fetch(`http://localhost:3001/user/${option.value}/accept`) // Marks the user as whitelisted in DB
        })
        const embed = new EmbedBuilder().setTitle("Notification").setDescription(`Notifying ${userIdsString}`).setColor(Colors.Green)
        await interaction.editReply({embeds:[embed]})
        await interaction.channel.send(`${userIdsString}, you have been whitelisted`)
    
    } else {
        const embed = new EmbedBuilder().setTitle("Permission error").setDescription("You are not authorized to use this command").setColor(Colors.Red)
        interaction.editReply({embeds:[embed]})
    }
    } catch {
        interaction.editReply("Failed to notify")
    }
}