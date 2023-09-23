import { EmbedBuilder } from "@discordjs/builders";
import {Colors, CommandInteraction} from "discord.js";
import {Transaction} from "../types/transaction";

export const transactionHistory = async (interaction:CommandInteraction) => {
    await interaction.deferReply();
    const senderHistory = await (await fetch(`http://localhost:3001/transactions/senderId/${interaction.user.id}`)).json()
    const receiverHistory = await (await fetch(`http://localhost:3001/transactions/receiverId/${interaction.user.id}`)).json()

    const senderString = senderHistory.map((data:Transaction) => {
        return `You sent <@${data.receiverId}> $${data.moneySent} at <t:${Math.floor(data.time/1000)}>`;
    }).join('\n');
    const receiverString = receiverHistory.map(data => {
        return `<@${data.senderId}> sent $${data.moneySent} to you at <t:${Math.floor(data.time/1000)}>`;
    }).join('\n');

    const embed = new EmbedBuilder().setTitle('Transaction History').addFields(
        { name: 'Sender History', value: senderString == "" ? "Nothing" : senderString},
        { name: 'Receiver History', value: receiverString == "" ? "Nothing" : receiverString}
        ).setColor(Colors.Green)
    await interaction.editReply({embeds: [embed]})
}