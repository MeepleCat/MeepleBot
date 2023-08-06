import { auth } from "../index.js";
import { google } from "googleapis";
const sheets = google.sheets("v4");

export const number_of_users = async (sheet) => {
    const response = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: sheet,
    range: "Sheet1!H2",
  });

  try {
    const cellValue = response.data.values;
    return cellValue;
  } catch (error) {
    return 0;
  }
}
