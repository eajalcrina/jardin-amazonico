import { describe, it, expect, vi, beforeEach } from "vitest";

const mockAppend = vi.fn().mockResolvedValue({});

vi.mock("googleapis", () => ({
  google: {
    auth: { JWT: vi.fn() },
    sheets: vi.fn(() => ({
      spreadsheets: { values: { append: mockAppend } },
    })),
  },
}));

beforeEach(() => {
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "test@iam.gserviceaccount.com";
  process.env.GOOGLE_SHEETS_PRIVATE_KEY = "fake\\nkey";
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "fake-id";
  mockAppend.mockClear();
});

describe("appendMembershipLead", () => {
  it("calls sheets.values.append with correct shape", async () => {
    const { appendMembershipLead } = await import("./sheets");
    await appendMembershipLead({
      fullName: "Eddie Test",
      email: "eddie@test.com",
      district: "Miraflores",
      plan: "Bosque",
      message: "Hola",
    });
    expect(mockAppend).toHaveBeenCalledOnce();
    const call = mockAppend.mock.calls[0]?.[0];
    expect(call?.spreadsheetId).toBe("fake-id");
    expect(call?.range).toBe("A:G");
    const row = call?.requestBody?.values?.[0];
    expect(row?.[1]).toBe("Eddie Test");
    expect(row?.[4]).toBe("Bosque");
    expect(row?.[6]).toBe("web");
  });

  it("throws when env vars missing", async () => {
    delete process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const { appendMembershipLead } = await import("./sheets");
    await expect(
      appendMembershipLead({
        fullName: "x",
        email: "x@x.com",
        district: "x",
        plan: "Bosque",
      }),
    ).rejects.toThrow(/Missing Google Sheets env/);
  });
});

describe("appendPlantPurchaseLead", () => {
  it("calls sheets.values.append with correct shape and Plant Leads range", async () => {
    const { appendPlantPurchaseLead } = await import("./sheets");
    await appendPlantPurchaseLead({
      fullName: "Eddie Test",
      email: "eddie@test.com",
      phone: "+51999111222",
      plantId: "JA-S001",
      plantName: "Alocasia Amazónica",
      priceRange: "S/ 185–255",
    });
    expect(mockAppend).toHaveBeenCalled();
    const lastCall = mockAppend.mock.calls.at(-1)?.[0];
    expect(lastCall?.range).toBe("Plant Leads!A:H");
    const row = lastCall?.requestBody?.values?.[0];
    expect(row?.[1]).toBe("Eddie Test");
    expect(row?.[3]).toBe("+51999111222");
    expect(row?.[4]).toBe("JA-S001");
    expect(row?.[7]).toBe("web-plant");
  });
});
