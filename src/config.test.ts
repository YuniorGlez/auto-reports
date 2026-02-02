import { expect, test, describe, beforeEach } from "bun:test";
import { getConfig } from "./config";
import * as core from "@actions/core";
import { mock } from "bun:test";

mock.module("@actions/core", () => ({
  getInput: (name: string) => process.env[name.toUpperCase().replace(/-/g, "_")] || "",
  info: () => {},
  warning: () => {},
}));

describe("config parsing", () => {
  beforeEach(() => {
    delete process.env.AURA_CONFIG;
  });

  test("should return defaults when no config is provided", () => {
    const config = getConfig();
    expect(config.branding.projectName).toBe("Project Aura-Scope");
    expect(config.behavior.language).toBe("en");
  });

  test("should parse valid JSON config", () => {
    process.env.AURA_CONFIG = JSON.stringify({
      branding: { projectName: "Custom", primaryColor: "#ff0000" },
      behavior: { language: "es" }
    });
    
    const config = getConfig();
    expect(config.branding.projectName).toBe("Custom");
    expect(config.branding.primaryColor).toBe("#ff0000");
    expect(config.behavior.language).toBe("es");
  });

  test("should fallback to defaults on invalid JSON", () => {
    process.env.AURA_CONFIG = "{ invalid json }";
    const config = getConfig();
    expect(config.branding.projectName).toBe("Project Aura-Scope");
  });
});
