import { expect, test, describe, afterEach, beforeEach } from "bun:test";
import { saveReport } from "./persistence";
import * as fs from "fs";
import * as path from "path";

describe("persistence logic", () => {
  const testDir = path.join(process.cwd(), "auto_reports");

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  test("saveReport should create directory and save file", () => {
    const config = {
      reportType: "Client",
      prNumber: 99,
      html: "<html>Test</html>"
    };

    const savedPath = saveReport(config);

    expect(fs.existsSync(savedPath)).toBe(true);
    expect(savedPath).toContain("auto_reports/pr-99/client-report.html");
    const content = fs.readFileSync(savedPath, "utf8");
    expect(content).toBe("<html>Test</html>");
  });
});
