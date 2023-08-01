export const bot_help = (interaction) => {
    try {
        interaction.reply("## List of commands (all commands start with the / prefix):\n### whitelist: adds your username to the queue.\n### change_username: changes the username recorded.\n### claim_number: allows you to claim a packager number to put on your rocket and thruster.\n### claimed_numbers: shows the claimed packager numbers.");

    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`)
        console.log(`Error: ${err}`)
    }
}
