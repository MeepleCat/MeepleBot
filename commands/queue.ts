import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";

// THIS IS BROKEN AND OLD, SWITCH TO NEW SYSTEM ON API
// THIS IS BROKEN AND OLD, SWITCH TO NEW SYSTEM ON API
// THIS IS BROKEN AND OLD, SWITCH TO NEW SYSTEM ON API
export const queue = async (interaction:CommandInteraction) => {
    if (process.env.admins && process.env.admins.includes(interaction.user.id)) {
        await interaction.deferReply({ ephemeral: true });
        try {
            const userQueue = await (await fetch('http://localhost:3001/appliedusers')).json();
            
            // Map over userQueue and create an array of Promises
            const promises = userQueue.map(async (user) => {
                const username = await (await fetch(`http://localhost:3001/user/${user.discordId}/astroneerusername`)).json();
                return `<@${user.discordId}> - ${username.astroneerUsername}`;
            });
            
            // Wait for all Promises to resolve
            const response = await Promise.all(promises);
            
            // Join the resolved array into a string
            const embed = new EmbedBuilder()
                .setTitle("Queue")
                .setDescription(response.length ? response.join('\n') : "Nobody")
                .setColor(Colors.Green);
            await interaction.editReply({ embeds: [embed] });
        } catch {
            await interaction.editReply("Failed to get queue");
        }
    } else {
        const embed = new EmbedBuilder().setTitle("Permissions error").setDescription("You are not authorized to do this action").setColor(Colors.Red);
        await interaction.editReply({ embeds: [embed] });
    }
}