
# Initial Concept

SQUAADS Aura-Scope: Automated Value & ROI Orchestrator

Desarrolla una GitHub Action avanzada que transforme cada Pull Request en un conjunto de activos de negocio. El sistema debe automatizar la traducción de cambios técnicos a informes de valor estratégico, gestionando una carpeta de avances en el repositorio que genere explicaciones no técnicas para el cliente, reportes de impacto operativo para el Product Manager y notas de lanzamiento para el usuario final, todo basado en el ROI del desarrollo realizado.

## Product Definition

### Target Users
- **Clients/Stakeholders**: Focused on high-level business value, strategic transparency, and ROI.
- **Product Managers**: Focused on operational impact, development velocity, and technical debt management.
- **End Users**: Focused on functional changes, new features, and "what's new" release notes.

### Core Goals
- **Bridging the Communication Gap**: Automatically translate technical code changes into business-centric narratives.
- **Historical Transparency**: Maintain a persistent 'advances' folder to serve as an automated, auditable record of project evolution.
- **Consistency & Branding**: Ensure every project has a unique yet structurally consistent visual identity for its reports from day one.

### Key Features
- **Intelligent PR Extraction**: Capture diffs, commit messages, and PR descriptions (handling cases where descriptions may be empty).
- **LLM Synthesis (Gemini REST)**: Use Gemini (specifically `gemini-flash-lite-latest` or equivalent) via direct REST API calls (`streamGenerateContent`) to transform technical data into three distinct reports.
- **Standardized Templating**: Implement an HTML/CSS template system that is generated/configured at project start with custom branding (colors, logos).
- **Automated Persistence**: Seamlessly update the 'advances' folder in the repository upon PR merge/activity.

### Technical Constraints
- **API Protocol**: All AI processing MUST use the Google Generative Language REST API (`v1beta`).
- **Response Format**: Use `responseMimeType: "application/json"` with a strict `responseSchema` to ensure predictable data structures for the templates.
