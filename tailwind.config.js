/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'albert-black': ['"Albert Sans"', 'sans-serif'],
        'albert-bold': ['"Albert Sans"', 'sans-serif'],
        'albert-semibold': ['"Albert Sans"', 'sans-serif'],
        'albert-regular': ['"Albert Sans"', 'sans-serif'],
        'albert-light': ['"Albert Sans"', 'sans-serif'],
        'hanchanyuanyuan': ['"M PLUS Rounded 1c"', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        'jetbrains-mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'pulse-orange': '#FF5F1F',
        'spectrum-purple': '#8A2BE2',
        'deep-space': '#05070A',
        'signal-gray': '#4A4A4A',
      },
    },
  },
  plugins: [],
}