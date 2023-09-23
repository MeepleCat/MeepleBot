import { EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

export const work = async (interaction) => {
    await interaction.deferReply();

    // INFO: gets the values from the database
    const previousBalance = await (await fetch(`http://localhost:3001/user/${interaction.user.id}/balance`)).json();
    const lastWorkTime = await (await fetch(`http://localhost:3001/user/${interaction.user.id}/job`)).json(); // Unix timestamp of when the user has last worked.

    const timeSinceLastWork = Date.now() - lastWorkTime.lastWorkTime; // Time since the last work, in milliseconds
    const remainingTime = (60 * 60 * 1000) - timeSinceLastWork; 

    // INFO: determines the amount of money that is recieved
    if (timeSinceLastWork >= 60 * 60 * 1000) {
        let salary = Math.floor(Math.random() * 1000);

        // INFO: in order to add another event you must add the event in outcomes and set its chance in probabilities (the number used as the chance does not matter)
        const outcomes = [
            `You worked at Pizza Hut and got $`,
            `You were promoted to manager of Pizza Hut and gained $`,
            `You became a barista at the local coffee shop and earned $`,
            `You wrote a best-selling novel and received royalties of $`,
            `You taught a weekend workshop on photography and made $`,
            `You started a dog walking business and collected $`,
            `You sold handmade crafts at the local fair and pocketed $`,
            `You were hired as a tour guide at the museum and received $`,
            `You won a local talent show with your band and got a prize of $`,
            `You set up a lemonade stand during a hot day and gained $`,
        ];
        const probabilities = [
            10, 
            1,
            10,
            3,
            10,
            10,
            10,
            10,
            10,
            10,
        ]

        // INFO: picks a number that is less than the total probability
        let totalProability = 0;
        for(let number of probabilities) {
            totalProability += number;
        }
        let result = Math.floor(Math.random() * totalProability);

        // INFO: uses the generated number to determine which event it corresponds to
        let cumulativeChance = 0;
        let determinedResult = false;
        let i = 0

        while(!determinedResult) {
            cumulativeChance += probabilities[i];
            
            if(result <= cumulativeChance) {
                result = i;
                determinedResult = true 
            }

            i++;
        }

        // INFO: determines the salaries for special events
        if(result === 1) {
            salary = 5000;
        }

        const outcome = outcomes[result] + `${salary}!`;

        console.log(lastWorkTime.lastWorkTime);

        // INFO: writes the time the user worked to the database
        await fetch(`http://localhost:3001/user/${interaction.user.id}/job`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lastWorkTime: Date.now()
            })
        }); 

        // INFO: writes the user's new balance to the database
        await fetch(`http://localhost:3001/user/${interaction.user.id}/balance`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                balance: previousBalance.balance + salary
            })
        })

        // INFO: creates the embed for discord
        const embed = new EmbedBuilder().setTitle("Job").setDescription(outcome).setColor(Colors.Green)
        await interaction.editReply({embeds:[embed]});

    } else {
        const remainingMinutes = Math.ceil(remainingTime / (60 * 1000));
        const embed = new EmbedBuilder().setTitle("Job").setDescription(`Please wait for another ${remainingMinutes} minute(s) before working again.`).setColor(Colors.Red)
        interaction.editReply({embeds:[embed]});
    }
} 