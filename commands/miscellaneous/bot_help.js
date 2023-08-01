export const bot_help = (interaction) => {
    try {
        interaction.reply("Check your DMs.")
        interaction.user.send("# Bot Information\n" +
            "This is a helpful guide to get you up and running with our bot.\n" +
            "All of the commands are going to be split into categories and listed below.\n" +
            "## Whitelisting\n" +
            "### /whitelist\n" +
            "This command adds you into our Google Sheets. After running this command,  you will have to wait to get manually whitelisted before being able to play on the server.\n" +
            "### /change_username\n" +
            "If you accidentally gave the bot the wrong username, you can use this command to change it. Beware, you will have to get whitelisted again if you change your username. \n" +
            "## Rocket ID's\n" +
            "### /claim_number\n" +
            "This command allows you to claim a Rocket ID. A Rocket ID is a way to track who owns which rocket. The format is \"shuttle_packagers-thruster-packagers\". In game, you will have to put the amount of packagers on your shuttle and thruster that you specified on discord.\n" +
            "An example is 2-2 which means 2 packagers on shuttle and 2 on thruster.\n" +
            "### /claimed_numbers\n" +
            "This command shows all claimed numbers on the server.\n" +
            "## Other\n" +
            "### /express_rage\n" +
            "Express your rage. Beware, the bot will express it's rage towards you too.\n" +
            "### /ping\n" +
            "This command is used to check if the bot is responding.\n" +
            "### /bot_help\n" +
            "You used this command.\n" +
            "### /diagnostics\n" +
            "Shows information about the bot such as how long it's been online for and the amount of commands ran since last update."
        )
    }
    catch(err) {
        interaction.channel.send(`Fatal error. \n${err}`)
        console.log(`Error: ${err}`)
    }
}
