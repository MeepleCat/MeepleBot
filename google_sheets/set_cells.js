import { google } from "googleapis";
import { auth } from "../index.js";
const sheets = google.sheets("v4");
const sheet = sheets.spreadsheets;

export const set_cells = async (sheet, range, new_values) => {
    const response = await sheets.spreadsheets.values.append({
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
