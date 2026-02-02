# Technology Stack

This document outlines the technical foundation for the SQUAADS Aura-Scope GitHub Action.

## 1. Core Runtime & Language
- **Language**: TypeScript
- **Runtime**: Bun (for high-performance execution within GitHub Actions)

## 2. GitHub Integration
- **GitHub Actions Toolkit**: Using `@actions/core` and `@actions/github` for seamless interaction with the GitHub environment, capturing PR events, and managing action outputs.

## 3. AI & Report Synthesis
- **Model**: Gemini (`gemini-flash-lite-latest`)
- **Integration**: Direct REST API calls using the Google Generative Language `v1beta` endpoint (`streamGenerateContent`).
- **Data Format**: Strict JSON output using `responseSchema` to ensure compatibility with report templates.

## 4. Templating & Branding
- **Engine**: Handlebars or EJS for injecting AI-generated JSON data into standardized HTML layouts.
- **Styling**: Modern CSS (potentially utilizing Tailwind-like utilities) configured at project start to match host-project branding.

## 5. Persistence
- **Storage**: Local filesystem within the repository.
- **Organization**: A dedicated `/advances` folder, structured to maintain a chronological history of business-value delivery linked to PR activity.
