/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#ffffffff',
        beige: {
          50: '#FEFDFB',
          100: '#F5F1E8',
          200: '#EBE7DC',
          300: '#E1DDD0',
          400: '#D7D3C4',
          500: '#C9BFB0',
          600: '#B8A896',
          700: '#9E8F7C',
          800: '#7A6F62',
          900: '#da7b28ff',
        },
        warm: {
          50: '#FFFBF7',
          100: '#F9F3ED',
          200: '#F3EDDF',
          300: '#EDE7D1',
          400: '#E7E1C3',
          500: '#D9CDB0',
          600: '#C9B896',
          700: '#B5A07C',
          800: '#9B8862',
          900: '#7A6F4F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'elegant-lg': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'elegant-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
};
