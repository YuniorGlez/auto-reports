import { expect, test, describe } from "bun:test";
import { renderReport } from "./templating";
import * as fs from "fs";
import * as path from "path";

describe("templating and rendering", () => {
  test("renderReport should combine base and sub-template with branding", () => {
    const config = {
      reportType: "Client" as const,
      prNumber: 42,
      date: "2026-02-02",
      summary: "Strategic summary",
      data: {
        strategic_pillars: [
          { pillar_name: "Security", business_impact: "High", roi_analysis: "10x" }
        ],
        risk_mitigation: "Zero risks"
      },
      branding: {
        primaryColor: "#ff0000",
        secondaryColor: "#00ff00",
        projectName: "Test Project"
      },
      lang: "en"
    };

    const html = renderReport(config);

    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Aura-Scope");
    expect(html).toContain("Client Report");
    expect(html).toContain("#ff0000"); // Primary color
    expect(html).toContain("Strategic summary");
    expect(html).toContain("Security");
    expect(html).toContain("10x");
    expect(html).toContain("Test Project");
  });
});
