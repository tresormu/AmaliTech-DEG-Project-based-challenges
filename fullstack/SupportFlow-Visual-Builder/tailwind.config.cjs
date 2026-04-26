/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sf: {
          bg: "#eef7f1",
          border: "#b8d9c6",
          deep: "#0d4228",
          mid: "#427055",
          text: "#173124",
          pane: "#ffffff",
          primary: "#198754"
        }
      }
    }
  },
  plugins: []
};
