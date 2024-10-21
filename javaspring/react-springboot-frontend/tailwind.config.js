/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // Adicione essas extensões para garantir que Tailwind funcione no TypeScript e JSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};