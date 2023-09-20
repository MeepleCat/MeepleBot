export const add_users_to_db = async (interaction) => {
    if (process.env.whitelist.includes(interaction.user.id)){
    await interaction.deferReply();
    const startTime = Date.now();
    try {
        const members = await interaction.guild.members.fetch(); // Fetch all members
        members.forEach(member => {
            fetch('http://localhost:3001/createuser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: member.user.username,
                    discordId: member.user.id
                })
            })
        });
    } catch (err) {
        console.error(`Failed to fetch members from guild: ${GUILD_ID} | Error: ${err.message}`);
    }
    const endTime = Date.now()
    
    interaction.editReply(`Added ${interaction.guild.memberCount} users to database. Took ${endTime-startTime} milliseconds.`)
    } else {
        interaction.reply("You can't do this because you are not Meeple or Speedy, sorry lol")
    }
}