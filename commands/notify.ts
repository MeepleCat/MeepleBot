import {Colors, CommandInteraction, EmbedBuilder} from "discord.js";

export const notify = async (interaction:CommandInteraction) => {
    try {
        await interaction.deferReply({ephemeral: true})
        if(process.env.admins.includes(interaction.user.id)) {
            const game = interaction.options.get("game").value
            const options = interaction.options.data
            const values = options.map(option => {
                return option.value
            })
            const users = values.slice(1)
            const userString = users.map(user => {
                return `<@${user}>`
            }).join(", ")
            for (const user of users) {
                const existence = await fetch(`http://localhost:3001/application/${game}/${user}/exists`).then(res => {
                    return res.json()
                })
                if (existence.exists) {
                    await fetch(`http://localhost:3001/application/${game}/${user}/accept`)
                }
            }

            const response = new EmbedBuilder()
                .setTitle(`Notifying`)
                .setDescription(`Notifying ${userString}`)
                .setColor(Colors.Purple)
            await interaction.editReply({embeds: [response]})
            await interaction.channel.send(`${userString}, you have been whitelisted on ${game}`)
        } else {
            await interaction.editReply("You can't do this")
        }
    } catch {
        await interaction.editReply("Could not notify, is the bot able to speak here?")
    }
}