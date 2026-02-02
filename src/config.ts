import { z } from "zod";
import * as core from "@actions/core";

const BrandingSchema = z.object({
  projectName: z.string().default("Project Aura-Scope"),
  primaryColor: z.string().default("#000000"),
  secondaryColor: z.string().default("#666666"),
  logoUrl: z.string().optional(),
}).default({
  projectName: "Project Aura-Scope",
  primaryColor: "#000000",
  secondaryColor: "#666666",
});

const BehaviorSchema = z.object({
  language: z.enum(["en", "es"]).default("en"),
  reports: z.array(z.enum(["client", "pm", "dev", "user"]))
    .default(["client", "pm", "dev", "user"]),
}).default({
  language: "en",
  reports: ["client", "pm", "dev", "user"],
});

const ConfigSchema = z.object({
  branding: BrandingSchema,
  behavior: BehaviorSchema,
});

export type Config = z.infer<typeof ConfigSchema>;

export function getConfig(): Config {
  const configRaw = core.getInput("aura-config") || process.env.AURA_CONFIG;
  
  if (!configRaw) {
    core.info("No aura-config provided, using defaults.");
    return ConfigSchema.parse({});
  }

  try {
    const parsed = JSON.parse(configRaw);
    return ConfigSchema.parse(parsed);
  } catch (error) {
    core.warning(`Failed to parse aura-config JSON: ${error}. Using defaults.`);
    return ConfigSchema.parse({});
  }
}
