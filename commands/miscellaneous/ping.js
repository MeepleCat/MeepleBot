export const ping = (interaction) => {
    try {
        interaction.reply("Pong!")
    }
    catch(err) {
        interaction.followUp(`Fatal error. Please let the developers of the bot know.\n${err}`)
        console.log(`Error: ${err}`)
    }
}
