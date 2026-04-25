# SecureVault Explorer

SecureVault Explorer is a React + Vite frontend for navigating enterprise-style nested file structures in a dark, security-focused UI.  
It supports recursive tree rendering, file inspection, keyboard navigation, and search with auto-expand.

## Live Demo

- Deployment Link: `VERCEL_LINK_HERE`

## Design File

- Figma Link: `FIGMA_LINK`

## Tech Stack

- React
- Vite
- Tailwind CSS

## Setup Instructions

1. Navigate to the project:
   ```bash
   cd fullstack/secure-vault
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Run lint checks:
   ```bash
   npm run lint
   ```

## Features Implemented

- Recursive file/folder tree from `data.json`
- Expand/collapse folder interactions
- File selection with distinct visual state
- Properties panel with `Name`, `Type`, and `Size`
- Keyboard navigation:
  - `ArrowUp` / `ArrowDown` for visible item navigation
  - `ArrowRight` to expand folder
  - `ArrowLeft` to collapse folder or move to parent
  - `Enter` to select file
- Accessibility-focused focus styles and tree semantics

## Recursive Strategy

The explorer uses recursive traversal in two places:

1. Rendering:
   - `TreeNode` recursively renders children for each folder.
   - This allows arbitrary depth (2 levels or 20+ levels) without extra UI branching.

2. State Derivation:
   - Utility functions recursively process the data tree for:
     - initial expansion map,
     - filtered search results,
     - visible item flattening for keyboard navigation,
     - node lookup by ID.

This keeps tree behavior predictable and scalable across deeply nested structures.

## Wildcard Feature

### Feature Chosen: Search With Auto-Expand Matches

I added a search input in the explorer panel that filters files and folders by name.  
When a deep child matches, parent folders are automatically expanded so the user can immediately see where the match exists.

### Why This Adds Business Value

- Reduces navigation time in deep legal/finance archives.
- Improves discoverability of files without manual folder-by-folder expansion.
- Supports power users who need fast retrieval in large structured vaults.

## Data Source

- The app reads from the provided `data.json` file without changing its structure.
- This simulates a backend payload and can be replaced later with API data.
