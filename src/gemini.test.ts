import { expect, test, describe, mock } from "bun:test";

// Mock @google/genai before importing generateReport
mock.module("@google/genai", () => {
  return {
    GoogleGenAI: class {
      models = {
        generateContent: async (params: any) => {
          return {
            text: JSON.stringify({
              summary: "This is a summary",
              items: []
            })
          };
        }
      };
    }
  };
});

import { generateReport } from "./gemini";

describe("gemini api client", () => {
  test("generateReport should use @google/genai SDK and return structured data", async () => {
    const result = await generateReport({
      prompt: "System instructions",
      input: "Technical data",
      apiKey: "fake-api-key",
      schema: { type: "OBJECT", properties: { summary: { type: "STRING" } } }
    });

    expect(result).toHaveProperty("summary");
    expect(result.summary).toBe("This is a summary");
  });
});
