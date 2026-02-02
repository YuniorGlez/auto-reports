# SQUAADS Aura-Scope: Automated Value & ROI Orchestrator

SQUAADS Aura-Scope is an advanced GitHub Action designed to transform technical Pull Request changes into strategic business assets. It automatically analyzes code diffs and commit metadata using Gemini to generate four distinct, branded reports (Client, PM, Dev, End-User) that quantify project progress and ROI.

## 🛠️ Project Overview
- **Purpose**: Bridge the gap between technical execution and business value transparency.
- **Primary Technology**: TypeScript & Bun for high-performance GitHub Action execution.
- **AI Integration**: Direct REST API calls to Gemini (`gemini-flash-lite-latest`) via `streamGenerateContent`.
- **Architecture**: A event-driven GitHub Action triggered by merges into the `main` branch.
- **Output**: Standardized, project-branded HTML reports persisted in the `/auto_reports` directory.

## 🚀 Building and Running

### Prerequisites
- **Bun**: The primary runtime and package manager.
- **GitHub Action Secret**: `GEMINI_API_KEY` must be configured in the host repository.

### Key Commands
- **Install Dependencies**: `bun install`
- **Run Tests**: `bun test`
- **Build/Bundle**: `bun run build` (Inferred for GitHub Action packaging)
- **Lint/Check**: `bun run lint` (Placeholder)

## 🏗️ Development Conventions

### Conductor Methodology
This project follows the **Conductor** methodology for task and project management.
- **The Plan is the Source of Truth**: All work is tracked in `conductor/tracks/<track_id>/plan.md`.
- **MVP-First Workflow**: Prioritize rapid prototyping and functional delivery over high test coverage during the initial phase.
- **Task-Based Commits**: Commit changes after every task completion with clear, conventional commit messages.
- **Git Notes**: Task summaries and verification reports are attached to commits via `git notes`.

### Prompt Management
- All LLM system prompts MUST be stored in the `prompts/` directory to facilitate rapid iteration and versioning.

### Coding Style
- **TypeScript**: Strict typing is required.
- **Standards**: Adhere to the style guides in `conductor/code_styleguides/`.

## 📁 Key Files & Directories
- `conductor/`: Project context, management tracks, and workflow definitions.
- `auto_reports/`: Chronological history of generated business-value reports.
- `prompts/`: System prompts for the different report audiences.
- `gemini-example.md`: Reference implementation for the Gemini REST API calls.
- `prd-draft.md`: The original product requirements document draft.
