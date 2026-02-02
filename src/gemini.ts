import { GoogleGenAI } from "@google/genai";

export interface GeminiConfig {
  prompt: string;
  input: string;
  apiKey: string;
  schema: any;
  model?: string;
}

export async function generateReport(config: GeminiConfig): Promise<any> {
  const {
    prompt,
    input,
    apiKey,
    schema,
    model = "gemini-flash-lite-latest"
  } = config;

  const client = new GoogleGenAI({ apiKey });

  const response = await client.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [{ text: input }]
      }
    ],
    config: {
      systemInstruction:  [{ text: prompt }],
      responseMimeType: "application/json",
      responseSchema: schema,
      // 2026 default: disable thinking for structured extraction unless needed
      thinkingConfig: { thinkingBudget: 0 }
    }
  });

  const textResponse = response.text;
  
  if (!textResponse) {
    throw new Error("Gemini API returned an empty response.");
  }

  try {
    return JSON.parse(textResponse);
  } catch (e) {
    throw new Error(`Failed to parse Gemini response as JSON: ${textResponse}`);
  }
}
