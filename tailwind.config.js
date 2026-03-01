/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.mdx',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'slide-x': 'slide-x 3s linear infinite',
      },
      keyframes: {
        'slide-x': {
          '0%, 100%': { transform: 'translateX(-5%)' },
          '50%': { transform: 'translateX(5%)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-mode="dark"]'],
};
