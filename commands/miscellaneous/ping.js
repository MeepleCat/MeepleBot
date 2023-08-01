export const ping = (interaction) => {
    try {
        interaction.reply("Pong!")
    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`)
        console.log(`Error: ${err}`)
    }
}
