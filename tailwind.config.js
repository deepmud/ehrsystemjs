/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/styles/**/*.{css,scss}',
      './public/index.html',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                secondary: '#6366F1',
                dark: '#1F2937',
                darker: '#111827',
            }
        }
    },
    plugins: [],
  }
 