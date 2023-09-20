import { EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

export const transactionHistory = async (interaction) => {
    await interaction.deferReply();
    const senderHistory = await (await fetch(`http://localhost:3001/transactions/senderId/${interaction.user.id}`)).json()
    const receiverHistory = await (await fetch(`http://localhost:3001/transactions/receiverId/${interaction.user.id}`)).json()

    const senderString = senderHistory.map(data => {
        return `You sent <@${data.receiverId}> $${data.moneySent} at <t:${Math.floor(data.time/1000)}>`;
    }).join('\n');
    const receiverString = receiverHistory.map(data => {
        return `<@${data.senderId}> sent $${data.moneySent} to you at <t:${Math.floor(data.time/1000)}>`;
    }).join('\n');

    const embed = new EmbedBuilder().setTitle('Transaction History').addFields(
        { name: 'Sender History', value: senderString == "" ? "Nothing" : senderString},
        { name: 'Receiver History', value: receiverString == "" ? "Nothing" : receiverString}
        ).setColor(Colors.Green)
    interaction.editReply({embeds: [embed]})
} 

const convertDate = (epoch) => {
    const date = new Date(epoch);
    return date.toLocaleString()
}