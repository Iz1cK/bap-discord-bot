import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function getWords(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1o1QxuZYDSM7efZdtbgyD7tR2BLacBxKQlP1sndjXEcQ",
    range: "A8:G1114",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  return rows;
}

async function jail(auth, cell) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: "1o1QxuZYDSM7efZdtbgyD7tR2BLacBxKQlP1sndjXEcQ",
    resource: {
      requests: [
        {
          updateCells: {
            start: {
              sheetId: 0,
              rowIndex: cell.row,
              columnIndex: cell.column,
              // rowIndex: 17,
              // columnIndex: 7,
            },
            fields: "*",
            rows: [
              {
                values: [
                  {
                    userEnteredValue: {
                      stringValue: "Jailed",
                    },
                    userEnteredFormat: {
                      backgroundColor: {
                        red: 0,
                        green: 0,
                        blue: 0,
                      },
                      horizontalAlignment: "CENTER",
                      textFormat: {
                        bold: true,
                        foregroundColor: {
                          red: 1,
                          green: 1,
                          blue: 1,
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  });
  return res;
}

async function putWord(auth, range, value) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: "1o1QxuZYDSM7efZdtbgyD7tR2BLacBxKQlP1sndjXEcQ",
    range: range,
    valueInputOption: "RAW",
    resource: { values: [[value]] },
  });
  return res;
}
// (async function main() {
//   const client = await authorize();
//   const words = await putWord(client);
//   // const words = await putWord(client, "F29", "test");
//   console.log(words);
// })();

export default { client: await authorize(), getWords, putWord, jail };
