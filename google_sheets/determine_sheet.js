export const determine_sheet = (interaction, testing_sheet, conquistadors_sheet, lil_universe_sheet) => {
    if (interaction.guild.id == 1115372571605610757) {
        return testing_sheet;
    }
    if (interaction.guild.id == 1038234163742003282) {
        return conquistadors_sheet;
    }
    if (interaction.guild.id == 1128108551873765450) {
        return lil_universe_sheet;
    }
}
