import { EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

export const work = async (interaction) => {
    await interaction.deferReply();
    const salary = Math.floor(Math.random() * 1000);
    const previousBalance = await (await fetch(`http://localhost:3001/user/${interaction.user.id}/balance`)).json(); // User's balance from database
    const lastWorkTime = await (await fetch(`http://localhost:3001/user/${interaction.user.id}/job`)).json(); // Unix timestamp of when the user has last worked.

    const timeSinceLastWork = Date.now() - lastWorkTime.lastWorkTime; // Time since the last work, in milliseconds
    const remainingTime = (60 * 60 * 1000) - timeSinceLastWork; 

    if (timeSinceLastWork >= 60 * 60 * 1000) {
        const outcomes = [
            `You worked at Pizza Hut and got $${salary}`,
            `Outcome 1 $${salary}`,
            `Outcome 2 $${salary}`,
            `Outcome 3 $${salary}`,
        ]; // Add more outcomes later
        const outcome = outcomes[Math.floor(Math.random() * 4)];
        console.log(lastWorkTime.lastWorkTime);

        await fetch(`http://localhost:3001/user/${interaction.user.id}/job`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lastWorkTime: Date.now()
            })
        }); // This uploads the current time, to save when the user has worked.

        await fetch(`http://localhost:3001/user/${interaction.user.id}/balance`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                balance: previousBalance.balance + salary
            })
        }) // Adds salary to user's balance
        const embed = new EmbedBuilder().setTitle("Job").setDescription(outcome).setColor(Colors.Green)
        await interaction.editReply({embeds:[embed]});
    } else {
        const remainingMinutes = Math.ceil(remainingTime / (60 * 1000));
        const embed = new EmbedBuilder().setTitle("Job").setDescription(`Please wait for another ${remainingMinutes} minute(s) before working again.`).setColor(Colors.Red)
        interaction.editReply({embeds:[embed]});
    }
} 