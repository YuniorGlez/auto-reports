# Implementation Plan: Aura-Scope Core

## Phase 1: Foundation & Scaffolding
- [x] Task: Initialize Action Environment (dfca997)
    - [ ] Create `package.json` with Bun/TypeScript dependencies
    - [ ] Setup `tsconfig.json` and basic directory structure (`src/`, `prompts/`, `templates/`)
- [x] Task: Prompt Management Setup (5c2bd54)
    - [ ] Create initial system prompts for the 4 report types in `prompts/`
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation' (Protocol in workflow.md)

## Phase 2: Data Extraction ## Phase 2: Data Extraction & Gemini Integration Gemini Integration [checkpoint: 21530f7]
- [x] Task: PR Metadata Extraction (b50411c)
    - [ ] Implement logic using `@actions/github` to fetch PR diffs and descriptions
- [x] Task: Gemini REST API Client (924e36e)
    - [ ] Implement the `streamGenerateContent` REST call following the `gemini-example.md` pattern
- [ ] Task: Conductor - User Manual Verification 'Phase 2: AI Integration' (Protocol in workflow.md)

## Phase 3: Templating & Branding
- [x] Task: HTML/Handlebars Templates (8e247b0)
    - [ ] Create the base HTML structure with Handlebars placeholders
- [x] Task: Dynamic Branding Injection (ff68ab0)
    - [ ] Implement logic to inject project-specific CSS variables based on configuration
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Visual Identity' (Protocol in workflow.md)

## Phase 4: Persistence & GitHub Action Packaging
- [ ] Task: Persistence Logic
    - [ ] Implement report saving to the `/auto_reports` folder
- [ ] Task: Action Entry Point
    - [ ] Finalize `action.yml` and the main entry point to orchestrate all phases
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Action' (Protocol in workflow.md)
