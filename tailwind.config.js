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
        // 保留你现有的
        'pulse-orange': '#7BD7FF',
        'spectrum-purple': '#8A2BE2',
        'deep-space': '#05070A',
        'signal-gray': '#4A4A4A',
        
        // 新增深空主题色
        'space-black': '#0A0A0F',
        'space-dark': '#0D1117',
        
        // 玻璃卡片系统
        'glass-bg': 'rgba(255,255,255,0.03)',
        'glass-border': 'rgba(255,255,255,0.08)',
        'glass-hover': 'rgba(255,255,255,0.06)',
        
        // 霓虹强调色
        'neon-cyan': '#00F0FF',
        'neon-pink': '#FF3366',
        'neon-purple': '#B829DD',
        
        // 文字系统
        'text-primary': '#E8E8E8',
        'text-dim': '#666666',
      },
    },
  },
  plugins: [],
}
