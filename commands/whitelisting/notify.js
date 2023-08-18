import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { set_cells } from "../../google_sheets/set_cells.js";

export const notify = async (interaction, sheet) => {
    try {
        await interaction.deferReply({ ephemeral: true });

        let users = parseInt(await number_of_users(sheet));
        let data = (await get_cells(sheet, `Sheet1!C2:F${users+1}`)).split(",");

        let columns = {
            ids: [],
            whitelisted: [],
            notified: [],
            times_whitelisted: []
        };

        for (let i = 0; i < users * 5; i++) {
            switch (i % 4) {
                case 0: columns.ids.push(data[i]); break;
                case 1: columns.whitelisted.push(data[i]); break;
                case 2: columns.notified.push(data[i]); break;
                case 3: columns.times_whitelisted.push(data[i]); break;
            }
        }

        let people_to_notify = [];

        for (let i = 0; i < users; i++) {
            if (columns.whitelisted[i] === "yes" && columns.notified[i] === "no") {
                people_to_notify.push(i);
                columns.notified[i] = "yes";
                columns.times_whitelisted[i] = parseInt(columns.times_whitelisted[i]) + 1;
            }
        }
        const role = interaction.guild.roles.cache.find(r => r.name === 'Player');
        if (!role) {
            interaction.followUp("the 'Player' role was not found ")
            return;
        }
        if (people_to_notify.length !== 0) {
            let new_values = [];

            for (let i = 0; i < users; i++) {
                new_values.push([
                    columns.ids[i],
                    columns.whitelisted[i],
                    columns.notified[i],
                    columns.times_whitelisted[i]
                ]);
            }

            await set_cells(sheet, `Sheet1!C2:F${users+1}`, new_values);

            let reply = people_to_notify.map(i => `<@${columns.ids[i].replace(/\D/g, '')}>`).join(", ");
            reply += ", you have been whitelisted. Check <#1038421196217274449> to join the realm.";
            await interaction.followUp(`${people_to_notify.length} ${people_to_notify.length === 1 ? 'person' : 'people' } to notify`);
            await interaction.channel.send(reply);
            // Iterate through the people to notify and assign the role
            for (let i of people_to_notify) {
                const userId = columns.ids[i].replace(/\D/g, '');
                const member = await interaction.guild.members.fetch(userId);
                if (member) {
                    await member.roles.add(role);
                }
            }
        } else {
            await interaction.followUp({ content: "There is no one to notify", ephemeral: true });
        }


    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`)
        console.log(`Error: ${err}`)
    }
}