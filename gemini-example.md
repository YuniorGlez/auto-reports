#!/bin/bash
set -e -E

GEMINI_API_KEY="$GEMINI_API_KEY"
MODEL_ID="gemini-flash-lite-latest"
GENERATE_CONTENT_API="streamGenerateContent"

cat << EOF > request.json
{
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "INSERT_INPUT_HERE"
          },
        ]
      },
    ],
    "generationConfig": {
      "thinkingConfig": {
        "thinkingBudget": 0,
      },
      "responseMimeType": "application/json",
      "responseSchema": {
          "type": "object",
          "properties": {
            "summary": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "content": {
                    "type": "string"
                  }
                },
                "required": [
                  "title",
                  "content"
                ],
                "propertyOrdering": [
                  "title",
                  "content"
                ]
              }
            }
          },
          "required": [
            "summary",
            "items"
          ],
          "propertyOrdering": [
            "summary",
            "items"
          ]
        },
    },
}
EOF

curl \
-X POST \
-H "Content-Type: application/json" \
"https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}" -d '@request.json'
