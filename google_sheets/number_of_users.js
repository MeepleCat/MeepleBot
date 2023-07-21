module.exports = number_of_users;

const { google } = require("googleapis");
const sheets = google.sheets("v4");

async function number_of_users(sheet) {
    const auth = require("../index.js");
  
    const response = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: sheet,
    range: "Sheet1!I2",
  });

  const cellValue = response.data.values[0][0];
  return cellValue;
}

module.exports = number_of_users;