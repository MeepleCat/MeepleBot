import { auth } from "../main.js";
import { google } from "googleapis";
const sheets = google.sheets("v4");

export const number_of_users = async (sheet) => {
    const response = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: sheet,
    range: "Sheet1!I2",
  });

  const cellValue = response.data.values[0][0];
  return cellValue;
}
