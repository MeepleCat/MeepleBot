import { google } from "googleapis";
import { auth } from "../main.js";
const sheets = google.sheets("v4");
const sheet = sheets.spreadsheets;

export const set_cells = async (sheet, range, new_values) => {
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