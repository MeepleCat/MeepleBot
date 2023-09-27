import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";

export const queue = async (interaction:CommandInteraction) => {
    if (process.env.admins && process.env.admins.includes(interaction.user.id)) {
    await interaction.deferReply({ephemeral:true})
    try {
    const userQueue = await (await fetch('http://localhost:3001/appliedusers')).json()
    const response = userQueue.map((user=>{
        return `<@${user.discordId}>`
    })).join('\n')
    const embed = new EmbedBuilder().setTitle("Queue").setDescription(response).setColor(Colors.Green)
    await interaction.editReply({embeds: [embed]})
    } catch {
        await interaction.editReply("Failed to get queue")
    }
    } else {
        const embed = new EmbedBuilder().setTitle("Permissions error").setDescription("You are not authorized to do this action").setColor(Colors.Red)
        await interaction.reply({embeds: [embed]})
    }
}