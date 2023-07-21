import { auth } from "../main.js";
import { google } from "googleapis";
const sheets = google.sheets("v4");

export const get_cells = async (sheet, range) => {
    const response = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheet,
        range: range,
  });

  return String(response.data.values);
}