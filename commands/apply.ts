import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";


// THIS IS BROKEN AND OLD, SWITCH TO NEW SYSTEM ON API
export const apply = async (interaction:CommandInteraction) => {
    await interaction.deferReply()
    try {
    await fetch(`http://localhost:3001/user/${interaction.user.id}/whitelist`)
    await fetch(`http://localhost:3001/user/${interaction.user.id}/astroneerusername`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            astroneerUsername: interaction.options.get("username").value
        })
    })
    const embed = new EmbedBuilder().setTitle("Application").setDescription("You have applied to get whitelisted").setColor(Colors.Green)
    await interaction.editReply({embeds: [embed]})
    } catch {
    await interaction.editReply("Could not apply")
    }
}