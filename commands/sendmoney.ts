import {CommandInteraction, EmbedBuilder} from "discord.js";

export const sendMoney = async (interaction:CommandInteraction) => {
    if (interaction.options.get("username").value != interaction.user.id){
    await interaction.deferReply();
    try {
    const senderBalance = await (await fetch(`http://localhost:3001/user/${interaction.user.id}/balance`)).json()
    const recipientBalance = await (await fetch(`http://localhost:3001/user/${interaction.options.get("username").value}/balance`)).json()
    
    if ((senderBalance.balance - (interaction.options.get("money").value as number)) < 0) {
        const embed = new EmbedBuilder().setTitle("Transaction").setDescription("You don't have enough money to do that").setColor("Red")
        await interaction.editReply({embeds: [embed]})
        return;
    } else if ((interaction.options.get("money").value as number) <= 0) {
        const embed = new EmbedBuilder().setTitle("Transaction").setDescription("You can't give someone a negative number or 0.").setColor("Red")
        await interaction.editReply({embeds: [embed]})
        return;
    }

    await fetch(`http://localhost:3001/user/${interaction.user.id}/balance`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            balance: senderBalance.balance - (interaction.options.get("money").value as number)
        })
    })

    await fetch(`http://localhost:3001/user/${interaction.options.get("username").value}/balance`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            balance: recipientBalance.balance + interaction.options.get("money").value
        })
    })
    const embed = new EmbedBuilder().setTitle("Transaction").setDescription(`You gave <@${interaction.options.get("username").value}> $${interaction.options.get("money").value}`).setColor('Green')

    await interaction.editReply({embeds: [embed]})

    await fetch(`http://localhost:3001/createtransaction`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senderId: interaction.user.id,
            receiverId: interaction.options.get("username").value,
            moneySent: interaction.options.get("money").value,
        })
    })
    } catch {
        interaction.editReply("Could not send money")
    }
    } else {
        const embed = new EmbedBuilder().setTitle("Transaction").setDescription("You can't give money to yourself.").setColor("Red")
        await interaction.reply({embeds: [embed]})
    }
}