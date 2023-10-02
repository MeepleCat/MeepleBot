import {Colors, CommandInteraction, EmbedBuilder} from "discord.js";

export const change_username = async (interaction:CommandInteraction) => {
    await interaction.deferReply()
    const game = interaction.options.get('game').value
    const username = interaction.options.get("username").value
    try {
        await fetch(`http://localhost:3001/application/${game}/${interaction.user.id}/username`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        })
        const response = new EmbedBuilder()
            .setTitle("Username change")
            .setDescription("Your username has successfully been changed")
            .setColor(Colors.Purple)
        await interaction.editReply({embeds:[response]})
    } catch {
        await interaction.editReply("Could not change username")
    }
}