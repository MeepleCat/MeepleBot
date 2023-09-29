import {Colors, CommandInteraction, EmbedBuilder} from "discord.js";

export const apply = async (interaction: CommandInteraction) => {
    try {
        await interaction.deferReply();
        const username = interaction.options.get("username").value
        const game = interaction.options.get("game").value

        // Checks for existing application
        const existence = await fetch(`http://localhost:3001/application/${game}/${interaction.user.id}/exists`).then(res=>{
            return res.json()
        })

        if (existence.exists) {
            const response = new EmbedBuilder()
                .setTitle("Application")
                .setDescription(`You have already applied for ${game}`)
                .setColor(Colors.Red)
            await interaction.editReply({embeds: [response]})
            return;
        }
        await fetch('http://localhost:3001/application', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                discordId: interaction.user.id,
                username: username,
                game: game
            })
        })
        const response = new EmbedBuilder()
            .setTitle("Application")
            .setDescription(`You have successfully applied for ${game}`)
            .setColor(Colors.Purple)
        await interaction.editReply({embeds: [response]})
    } catch {
        await interaction.editReply("Could not apply")
    }
}