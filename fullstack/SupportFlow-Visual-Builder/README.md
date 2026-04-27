# SupportFlow Visual Builder

SupportFlow Visual Builder is a React + Vite visual decision tree editor for customer support automation.  
It allows support managers to build, visualize, and test conversation flows in real-time with zero external graph libraries.

## 🔗 Project Links

- **Live Demo**: [View Project Live](https://amali-tech-deg-project-based-challe-nine.vercel.app/)
- **Design File**: [Figma Design System](https://www.figma.com/design/z0dI5NlX3zRiqVHGnMhlyj/Support-Flow?node-id=0-1&p=f&t=sjIeibiIPBn8sYz3-0)

## Tech Stack

- React
- Vite
- Tailwind CSS

## Setup Instructions

1. Navigate to the project:
   ```bash
   cd fullstack/SupportFlow-Visual-Builder
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

- **Visual Flowchart Editor**: Build and visualize decision trees on a responsive canvas with absolute positioning.
- **Real-Time Sync**: Every text edit in the configuration panel reflects instantly on the flowchart and in the live preview.
- **Preview Mode (The Runner)**: Test-drive your bot experience instantly with a clean, chat-inspired interface that traverses the decision tree based on user answers.
- **Smart Connectors**: Dynamic, curved SVG paths that automatically recalculate based on node height changes and position updates.
- **Absolute Canvas Management**: Precise control over node positioning without reliance on third-party layout engines.

## Engineering Strategy: Zero-Dependency Graphing

This project intentionally avoids external graph libraries like React Flow or Mermaid.js to demonstrate core DOM and SVG manipulation expertise:

1. **State-Driven Rendering**:
   - The entire flow is represented as a flat array of nodes with `id`, `position`, and `content`.
   - Connectors are derived dynamically by mapping over the nodes and their defined transitions.

2. **Dynamic SVG Layer**:
   - A dedicated SVG layer sits behind the HTML nodes.
   - It calculates Bezier curves between node ports in real-time as nodes are moved or edited, ensuring visual continuity.

This approach keeps the bundle size minimal and provides total control over the UX.

## Wildcard Feature

### Feature Chosen: Drag-and-Drop Repositioning

I implemented a custom Drag-and-Drop system that allows users to freely reposition nodes on the canvas.

### Why This Adds Business Value

- **Spatial Logic**: Users can group related support questions together spatially, making complex flows significantly easier to audit and understand.
- **Professional UX**: Interactive dragging provides a high-end feel that replaces the "static config" experience with a modern, intuitive workspace.
- **Workflow Efficiency**: Reduces the friction of building large trees by allowing users to "make room" for new branches exactly where they need them.

## Data Source

- The app initializes from a default state representing a standard support flow.
- All changes are persisted in the application state, simulating a dynamic builder that could be connected to a backend database.
