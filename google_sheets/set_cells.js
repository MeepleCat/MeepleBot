const { ShardEvents } = require("discord.js");
const { google } = require("googleapis");
const sheets = google.sheets("v4");
const sheet = sheets.spreadsheets;

async function set_cells(sheet, range, new_values) {
    const auth = require("../index.js");
    console.log(new_values);
    const response = await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: sheet,
        range: range,
        valueInputOption: "RAW",
        resource: {
            values: new_values,
        },
  });

  return String(response.data.values);
}

module.exports = set_cells;