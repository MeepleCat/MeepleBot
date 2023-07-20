const { ShardEvents } = require("discord.js");
const { google } = require("googleapis");
const sheets = google.sheets("v4");
const sheet = sheets.spreadsheets;

async function get_cells(sheet, range) {
    const auth = require("../index.js");

    const response = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheet,
        range: range,
  });

  return String(response.data.values);
}

module.exports = get_cells;