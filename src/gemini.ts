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

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: prompt }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: input }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error("Gemini API returned no candidates.");
  }

  const textResponse = data.candidates[0].content.parts[0].text;
  
  try {
    return JSON.parse(textResponse);
  } catch (e) {
    throw new Error(`Failed to parse Gemini response as JSON: ${textResponse}`);
  }
}
