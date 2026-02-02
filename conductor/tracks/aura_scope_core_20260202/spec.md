# Specification: Aura-Scope Core

## 1. Goal
Develop the core GitHub Action that automates the generation of four distinct business reports (Client, PM, Dev, User) upon merging a Pull Request into the `main` branch.

## 2. Scope
- **Trigger**: GitHub `pull_request` event (closed/merged).
- **Data Capture**: Extract PR diffs, commit messages, and descriptions.
- **AI Processing**: Send technical data to Gemini REST API (`gemini-flash-lite-latest`) with specific system prompts.
- **Templating**: Inject AI-generated JSON into Handlebars-based HTML templates.
- **Branding**: Dynamic CSS injection for project-specific colors/logos.
- **Persistence**: Save generated HTML reports to the `/auto_reports` directory in the repository.

## 3. Success Criteria
- Successful extraction of git metadata in a GitHub Action environment.
- Valid JSON response from Gemini REST API following the provided schema.
- Four distinct HTML files generated with correct branding and content.
- Reports successfully committed to the repository's `auto_reports/` folder.
