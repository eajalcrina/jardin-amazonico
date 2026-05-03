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
