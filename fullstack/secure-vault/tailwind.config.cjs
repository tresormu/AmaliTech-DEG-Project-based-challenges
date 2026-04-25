/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sv-bg": "#060d17",
        "sv-top": "#08111d",
        "sv-panel": "#0b1525",
        "sv-border": "#1d2e48",
        "sv-cyan": "#00d4ff",
        "sv-label": "#93b1c9",
        "sv-text": "#b7cad9"
      }
    }
  },
  plugins: []
};
