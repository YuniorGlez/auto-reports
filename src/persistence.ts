import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";

export interface SaveReportConfig {
  reportType: string;
  prNumber: number;
  html: string;
}

export function saveReport(config: SaveReportConfig): string {
  const { reportType, prNumber, html } = config;
  
  const baseDir = path.join(process.cwd(), "auto_reports");
  const prDir = path.join(baseDir, `pr-${prNumber}`);

  // Ensure directories exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }
  if (!fs.existsSync(prDir)) {
    fs.mkdirSync(prDir);
  }

  const fileName = `${reportType.toLowerCase()}-report.html`;
  const filePath = path.join(prDir, fileName);

  fs.writeFileSync(filePath, html, "utf8");
  
  core.info(`Report saved: ${filePath}`);
  
  return filePath;
}
