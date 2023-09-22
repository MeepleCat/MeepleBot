import { Colors, EmbedBuilder } from "discord.js";

export const balance = async (interaction) => {
    await interaction.deferReply()
    try {
    const balance = await fetch(`http://localhost:3001/user/${interaction.user.id}/balance`)
    const data = await balance.json();

    const embed = new EmbedBuilder().setTitle("Balance").setDescription(`Your balance is $${data.balance}`).setColor("Green")
    await interaction.editReply({embeds: [embed]})
    } catch {
        const embed = new EmbedBuilder.setTitle("Error").setDescription("Could not get balance").setColor(Colors.Red)
        await interaction.editReply({embeds:[embed]})
    }

}