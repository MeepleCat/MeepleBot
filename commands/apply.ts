import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";

export const apply = async (interaction:CommandInteraction) => {
    await interaction.deferReply()
    try {
    await fetch(`http://localhost:3001/user/${interaction.user.id}/whitelist`)
    const embed = new EmbedBuilder().setTitle("Application").setDescription("You have applied to get whitelisted").setColor(Colors.Green)
    await interaction.editReply({embeds: [embed]})
    } catch {
    await interaction.editReply("Could not apply")
    }
}