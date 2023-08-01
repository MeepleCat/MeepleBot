
export const diagnostics = async (interaction, commandCount, aliveTime) => {
    const currentTime = Date.now() / 1000;
    const secondsAlive = currentTime - aliveTime;
    const hoursAlive = Math.floor(secondsAlive / 3600);
    const minutesAlive = Math.floor((secondsAlive % 3600) / 60);

    interaction.reply(`# Diagnostics \nBot online for: ${hoursAlive} hours, ${minutesAlive} minutes\nCommands ran: ${commandCount}`)

}