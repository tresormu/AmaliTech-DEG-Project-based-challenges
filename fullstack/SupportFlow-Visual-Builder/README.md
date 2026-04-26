# SupportFlow Visual Builder

A professional, zero-dependency visual decision tree editor for customer support automation. This tool bridges the gap between complex logic configuration and user-friendly visual design, allowing support managers to build, visualize, and test conversation flows in real-time.

## 🔗 Project Links

- **Live Demo**: [View Project Live](https://amali-tech-deg-project-based-challe-nine.vercel.app/)
- **Design File**: [Figma Design System](https://figma.com/file/your-design-link)

## 🚀 Key Features

- **Visual Flowchart Editor**: Build and visualize decision trees on a responsive canvas with absolute positioning.
- **Real-Time Sync**: Every text edit in the configuration panel reflects instantly on the flowchart and in the live preview.
- **Preview Mode (The Runner)**: Test-drive your bot experience instantly with a clean, chat-inspired interface that traverses the decision tree based on user answers.
- **Zero Library Dependency**: Built from scratch using React and Tailwind CSS, intentionally avoiding external graph libraries like React Flow or Mermaid.js to demonstrate core DOM and SVG manipulation expertise.
- **Smart Connectors**: Dynamic, curved SVG paths that automatically recalculate based on node height changes and position updates.

## 🛠️ Wildcard Feature: Drag-and-Drop Repositioning

For the "Innovation Clause" requirement, I implemented a **custom Drag-and-Drop system** for node repositioning.

### Why it adds value:
- **Spatial Logic**: Users can group related support questions together spatially, making complex flows significantly easier to audit and understand.
- **Professional User Experience**: Interactive dragging provides a high-end feel that replaces the "messy Excel" experience with a modern, intuitive workspace.
- **Canvas-Scale Accuracy**: The dragging logic intelligently accounts for the current viewport scaling, ensuring that movement feels precise and fluid on any screen size.

## 💻 Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts)

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   ```
2. **Navigate to the project directory**:
   ```bash
   cd fullstack/SupportFlow-Visual-Builder
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open the application**:
   Navigate to `http://localhost:5173` in your browser.

---
Built by [Your Name/Handle] as part of the AmaliTech DEG Project-based Challenges.
