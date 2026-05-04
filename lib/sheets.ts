import { google } from "googleapis";

export type MembershipLeadInput = {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  plan: "Bosque" | "Suelo";
  message?: string;
};

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets env vars (CLIENT_EMAIL, PRIVATE_KEY, SPREADSHEET_ID)",
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, spreadsheetId };
}

export async function appendMembershipLead(
  input: MembershipLeadInput,
): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    input.fullName,
    input.email,
    input.phone,
    input.district,
    input.plan,
    input.message ?? "",
    "web",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

export type PlantLeadInput = {
  fullName: string;
  email: string;
  phone: string;
  plantId: string;
  plantName: string;
  priceRange: string;
};

export async function appendPlantPurchaseLead(
  input: PlantLeadInput,
): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    input.fullName,
    input.email,
    input.phone,
    input.plantId,
    input.plantName,
    input.priceRange,
    "web-plant",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Plant Leads!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

export type LandscapingLeadInput = {
  fullName: string;
  email: string;
  phone: string;
  message?: string;
};

export async function appendLandscapingLead(
  input: LandscapingLeadInput,
): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    input.fullName,
    input.email,
    input.phone,
    input.message ?? "",
    "web-paisajismo",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Landscaping Leads!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

export type CorporateLeadInput = {
  fullName: string;
  email: string;
  phone: string;
  message?: string;
};

export async function appendCorporateLead(
  input: CorporateLeadInput,
): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    input.fullName,
    input.email,
    input.phone,
    input.message ?? "",
    "web-corporativo",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Corporate Leads!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}
