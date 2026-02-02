import * as core from "@actions/core";
import { getPRMetadata } from "./github";
import { getConfig } from "./config";
import { generateReport } from "./gemini";
import { renderReport } from "./templating";
import { saveReport } from "./persistence";
import * as fs from "fs";
import * as path from "path";

async function run() {
  try {
    // Buscar la API Key en inputs primero, luego en env
    const inputKey = core.getInput("gemini-api-key");
    const envKey = process.env.GEMINI_API_KEY;
    
    if (inputKey) core.info("✅ API Key encontrada vía input 'gemini-api-key'");
    if (envKey) core.info("✅ API Key encontrada vía variable de entorno 'GEMINI_API_KEY'");

    const apiKey = inputKey || envKey;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY no encontrada. Asegúrate de pasarla en el bloque 'env:' o como input.");
    }

    core.info("🚀 Starting Aura-Scope Report Generation...");

    // 1. Get Configuration
    const config = getConfig();
    const lang = config.behavior.language;
    core.info(`Language set to: ${lang}`);

    // 2. Extract Metadata
    const metadata = await getPRMetadata();
    core.info(`Processing PR #${metadata.number}: ${metadata.title}`);

    // 3. Prepare AI Input
    const aiInput = `
PR Title: ${metadata.title}
PR Description: ${metadata.description}

PR DIFF:
${metadata.diff}
`.trim();

    // 4. Generate Reports
    const reportsToGenerate = config.behavior.reports;
    const dateStr = new Date().toISOString().split("T")[0];

    for (const type of reportsToGenerate) {
      core.info(`Generating ${type} report...`);
      
      // Load System Prompt
      const promptPath = path.join(process.cwd(), "prompts", lang, `${type}_report.md`);
      if (!fs.existsSync(promptPath)) {
        core.warning(`Prompt not found for ${type} in ${lang}. Skipping.`);
        continue;
      }
      const systemPrompt = fs.readFileSync(promptPath, "utf8");

      // Load Response Schema
      const schemaPath = path.join(process.cwd(), "prompts", "schemas", `${type}.json`);
      let schema = undefined;
      if (fs.existsSync(schemaPath)) {
        schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
      }

      const aiResponse = await generateReport({
        prompt: systemPrompt,
        input: aiInput,
        apiKey: apiKey,
        schema: schema
      });

      // 5. Render Template
      // Find the summary field regardless of its name in the specialized schema
      const summary = aiResponse.executive_summary || 
                      aiResponse.operational_overview || 
                      aiResponse.architectural_overview || 
                      aiResponse.welcome_message || 
                      aiResponse.summary || "";

      const html = renderReport({
        reportType: (type.charAt(0).toUpperCase() + type.slice(1)) as any,
        prNumber: metadata.number,
        date: dateStr,
        summary: summary,
        data: aiResponse,
        branding: config.branding,
        lang: lang
      });

      // 6. Save Report
      saveReport({
        reportType: type,
        prNumber: metadata.number,
        html: html
      });
    }

    core.info("✅ All reports generated successfully!");

  } catch (error: any) {
    core.setFailed(`Aura-Scope failed: ${error.message}`);
  }
}

run();
