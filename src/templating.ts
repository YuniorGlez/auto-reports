import Handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  projectName: string;
}

export interface RenderConfig {
  reportType: "Client" | "PM" | "Dev" | "User";
  prNumber: number;
  date: string;
  summary: string;
  data: any;
  branding: BrandingConfig;
  lang: string;
}

export function renderReport(config: RenderConfig): string {
  const templatesDir = path.join(process.cwd(), "templates");
  
  // Load base template
  const baseSource = fs.readFileSync(path.join(templatesDir, "base.hbs"), "utf8");
  const baseTemplate = Handlebars.compile(baseSource);

  // Load specific report template
  const reportTypeLower = config.reportType.toLowerCase();
  const reportSource = fs.readFileSync(path.join(templatesDir, `${reportTypeLower}.hbs`), "utf8");
  const reportTemplate = Handlebars.compile(reportSource);

  // Render report body
  const reportBody = reportTemplate(config.data);

  // Render full report
  const fullHtml = baseTemplate({
    lang: config.lang,
    title: `${config.reportType} Report`,
    brand_color_primary: config.branding.primaryColor,
    brand_color_secondary: config.branding.secondaryColor,
    report_type: config.reportType,
    pr_number: config.prNumber,
    date: config.date,
    summary: config.summary,
    project_name: config.branding.projectName,
    body: reportBody
  });

  return fullHtml;
}
