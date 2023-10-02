import {Colors, CommandInteraction, EmbedBuilder} from "discord.js";

export const queue = async (interaction:CommandInteraction) => {
    try {
        await interaction.deferReply({ephemeral: true})
        if (process.env.admins.includes(interaction.user.id)) {
            const game = interaction.options.get("game").value
            const queue = await fetch(`http://localhost:3001/application/${game}`).then(res => {
                return res.json()
            })
            const queueString = queue.map(application => {
                return `<@${application.discordId}> \`\`\`${application.username}\`\`\``
            }).join('\n')

            const response = new EmbedBuilder()
                .setTitle(`Queue: ${game}`)
                .setDescription(queueString == "" ? "Nobody" : queueString)
                .setColor(Colors.Purple)
            await interaction.editReply({embeds: [response]})
        } else {
            await interaction.editReply("You can't do this")
        }
    } catch {
        await interaction.editReply("Could not get queue")
    }
}