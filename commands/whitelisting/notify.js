import { number_of_users } from "../../google_sheets/number_of_users.js";
import { get_cells } from "../../google_sheets/get_cells.js";
import { set_cells } from "../../google_sheets/set_cells.js";
import { people } from "googleapis/build/src/apis/people/index.js";

export const notify = async (interaction, sheet) => {
    await interaction.deferReply({ephemeral: true});

    let users = parseInt(await number_of_users(sheet));
    let data = (await get_cells(sheet, `Sheet1!C2:G${users+1}`)).split(",");

    let ids = [];
    let rocket_ids = [];
    let whitelisted = [];
    let notified = []; 
    let times_whitelisted = [];

    for(let i = 0; i < users * 5; i++) {
        if(i % 5 === 0) {
            ids.push(data[i]);
        }
        if(i % 5 === 1) {
            rocket_ids.push(data[i])
        }
        if(i % 5 === 2) {
            whitelisted.push(data[i])
        }
        if(i % 5 === 3) {
            notified.push(data[i])
        }
        if(i % 5 === 4) {
            times_whitelisted.push(data[i])
        }
    }

    let people_to_notify = [];

    for(let i = 0; i < users; i++) {
        if(whitelisted[i] === "yes" && notified[i] === "no") {
            people_to_notify.push(i);
            notified[i] = "yes";
            times_whitelisted[i] = parseInt(times_whitelisted[i]) + 1;
        }
    }
    
    if(people_to_notify.length !== 0) {
        let new_values = [];
        for(let i = 0; i < users; i++) {
            let temp = [];
            temp.push(ids[i]);
            temp.push(rocket_ids[i]);
            temp.push(whitelisted[i]);
            temp.push(notified[i]);
            temp.push(times_whitelisted[i]);
            new_values.push(temp);
        }

        await set_cells(sheet, `Sheet1!C2:G${users+1}`, new_values);

        let reply = "";
        for(let i = 0; i < people_to_notify.length; i++) {
            reply = reply + `<@${ids[people_to_notify[i]].replace(/\D/g, '')}>, `;
        } 
        reply = reply + "you have been whitelisted.";

        console.log(`${people_to_notify.length} people to notify`)
        await interaction.followUp(`${people_to_notify.length} ${people_to_notify.length === 1 ? 'person' : 'people' } to notify`);
        await interaction.channel.send(reply)
    }
    else {
        console.log(people_to_notify.length)
        await interaction.followUp({content: "There is no one to notify", ephemeral: true});
    }
}