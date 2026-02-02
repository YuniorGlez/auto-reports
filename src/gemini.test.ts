import { expect, test, describe, mock } from "bun:test";
import { generateReport } from "./gemini";

describe("gemini api client", () => {
  test("generateReport should call Gemini API and return structured data", async () => {
    // We will mock the global fetch
    const mockFetch = mock(async (url: string, options: any) => {
      return new Response(JSON.stringify({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    summary: "This is a summary",
                    items: []
                  })
                }
              ]
            }
          }
        ]
      }));
    });
    
    global.fetch = mockFetch;

    const result = await generateReport({
      prompt: "System instructions",
      input: "Technical data",
      apiKey: "fake-api-key",
      schema: { type: "object", properties: { summary: { type: "string" } } }
    });

    expect(result).toHaveProperty("summary");
    expect(mockFetch).toHaveBeenCalled();
    
    const [url, options] = mockFetch.mock.calls[0] as [string, any];
    expect(url).toContain("gemini-flash-lite-latest:generateContent");
    expect(url).toContain("key=fake-api-key");
    expect(options.method).toBe("POST");
  });
});
