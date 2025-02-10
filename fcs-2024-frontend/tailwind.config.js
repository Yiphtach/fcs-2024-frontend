/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E293B", // Dark Blue (for backgrounds)
          secondary: "#3B82F6", // Bright Blue (for highlights)
          accent: "#F59E0B", // Orange (for buttons)
        },
      },
    },
    plugins: [],
  };
  